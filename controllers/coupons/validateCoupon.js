import Coupon from '../../models/Coupon.js';

const validateCoupon = async (req, res, next) => {
    const { code } = req.body;

    try {

        const coupon = await Coupon.findOne({ code });

        // Verificar si el cupón existe
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Cupón no encontrado'
            });
        }

        // Verificar si el cupón ha expirado
        if (coupon.expiryDate < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Cupón expirado'
            });
        }

        // Verificar si el cupón ha alcanzado su límite de uso
        if (coupon.usageLimit <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El cupón ha excedido el límite de uso'
            });
        }

        
        coupon.usageLimit -= 1;
        await coupon.save();

        
        return res.status(200).json({
            success: true,
            message: '¡Has usado tu cupón de descuento!',
            discountPercentage: coupon.discountPercentage,
            discountAmount: coupon.discountAmount
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: '¡Ocurrió un error al validar el cupón!'
        });
    }
}

export default validateCoupon;
