import Order from '../../models/Order.js';
import Product from '../../models/Product.js';

// Controlador para obtener las órdenes de un usuario
export const myOrders = async (req, res) => {
    try {
        // Obtener el ID del usuario desde el token JWT
        const userId = req.user._id;

        // Buscar todas las órdenes del usuario autenticado
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'products.product',
                model: Product,
                select: 'name price images stock'
            })
            .sort({ createdAt: -1 }); // Ordenar por fecha de creación, más reciente primero

        // Verificar si el usuario tiene órdenes
        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron órdenes para este usuario.'
            });
        }

        // Devolver las órdenes encontradas
        res.status(200).json({
            success: true,
            orders,
        });

    } catch (error) {
        console.error('Error al obtener las órdenes del usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Hubo un error al obtener las órdenes del usuario.',
        });
    }
};
