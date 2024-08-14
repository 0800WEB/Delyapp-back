import Order from '../../models/Order.js';

// OBTENER ORDENES DE LAS ULTIAMS 24 HORAS
const getLastOrders = async (req, res) => {
    try {
        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const orders = await Order.find({
            createdAt: { $gte: last24Hours }
        }).populate('products.product').populate('user', 'name email');

        if (!orders.length) {
            return res.status(404).json({ success: false, message: 'No se encontraron órdenes en las últimas 24 horas' });
        }

        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default getLastOrders;
