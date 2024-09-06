import Order from '../../models/Order.js';

const readOrder = async (req, res) => {
    try {
        // Obtener el ID de la orden desde los parámetros de la solicitud
        const { orderId } = req.params;

        // Verificar que el ID sea válido
        if (!orderId) {
            return res.status(400).json({ error: 'El ID de la orden es requerido.' });
        }

        // Buscar la orden por ID
        const order = await Order.findById(orderId);

        // Si no se encuentra la orden, devolver un error 404
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada.' });
        }

        // Devolver el estado de la orden
        res.status(200).json({ success:true, order});

    } catch (error) {
        // Manejar errores generales
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

export default readOrder;
