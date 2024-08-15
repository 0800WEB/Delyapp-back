import Coupon from "../models/Coupon";

const usageLimitCupon = async (req, res, next) => {
    try {
        let { couponId } = req.body
        let coupon = await Coupon.findById(couponId)
        // Verificar si el cupón ha alcanzado su límite de uso
        if (coupon.usageLimit <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El cupón ha excedido el límite de uso'
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
export default usageLimitCupon