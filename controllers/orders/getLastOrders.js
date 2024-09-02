import Order from '../../models/Order.js';

// OBTENER ORDENES DE LAS ULTIAMS 24 HORAS
const getLastOrders = async (req, res) => {
    try {
        const now = new Date();
        const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const orders = await Order.find({
            createdAt: { $gte: last24Hours }
            }).populate('user', 'name email')
            .populate('coupon', 'code discountPercentage discountAmount')
            .populate({
                path: 'products.product', // Hacemos populate en cada producto dentro del array
                select: 'name price description', // Campos que deseas obtener del producto
            })
            .sort({ createdAt: -1 }) // Ordenar por fecha de creación de más reciente a más antigua
        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        console.log(error)
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default getLastOrders;
