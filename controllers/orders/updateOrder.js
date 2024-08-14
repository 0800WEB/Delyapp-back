import Order from '../../models/Order.js';

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        // Actualizar estado
        if (status) order.status = status;

        await order.save();
        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default updateOrder;
