import Order from '../../models/Order.js';

const getTotalRevenue = async (req, res) => {
    try {
        // Agrega todas las órdenes y suma el totalPrice
        const totalRevenue = await Order.aggregate([
            {
                $group: {
                    _id: null, // No necesitamos agrupar por ninguna clave en particular
                    totalRevenue: { $sum: "$totalPrice" } // Sumamos todos los valores de totalPrice
                }
            }
        ]);

        // Verificamos si hay algún resultado
        if (totalRevenue.length === 0) {
            return res.status(200).json(0);
        }

        // Enviamos la respuesta con el total de ingresos
        return res.status(200).json(totalRevenue[0].totalRevenue);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error interno en el servidor'
        });
    }
};

export default getTotalRevenue;
