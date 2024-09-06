import Coupon from '../../models/Coupon.js';

const getCoupons = async (req, res) => {
    try {
        const now = new Date();
        const coupons = await Coupon.find();
        if (coupons?.length === 0) {
            return res.status(404).json({ success: false, message: 'No hay cupones vigentes disponibles' });
        }
        return res.status(200).json({ success: true, coupons });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default getCoupons;
