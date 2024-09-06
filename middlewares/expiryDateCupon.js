import Coupon from "../models/Coupon";

const expiryDateCupon = async (req, res, next) => {
    try {
        let { couponId } = req.body
        let coupon = await Coupon.findById(couponId)
        // Verificar si el cupón ha expirado
        if (coupon.expiryDate < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Cupón expirado'
            });
        }
        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: '¡Ocurrió un error al validar el cupón!'
        });
    }
}
export default expiryDateCupon