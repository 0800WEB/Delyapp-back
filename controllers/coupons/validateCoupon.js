import Coupon from '../../models/Coupon.js';

const validateCoupon = async (req, res, next) => {
    const { code } = req.body;

    try {
        // Buscar el cupón en la base de datos
        const coupon = await Coupon.findOne({ code });

        // Verificar si el cupón existe
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found'
            });
        }

        // Verificar si el cupón ha expirado
        if (coupon.expiryDate < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Coupon has expired'
            });
        }

        // Verificar si el cupón ha alcanzado su límite de uso
        if (coupon.usageLimit <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Coupon usage limit reached'
            });
        }

        // Reducir el límite de uso del cupón
        coupon.usageLimit -= 1;
        await coupon.save();

        // Si todo es válido, devolver el descuento
        return res.status(200).json({
            success: true,
            message: 'Coupon is valid',
            discountPercentage: coupon.discountPercentage,
            discountAmount: coupon.discountAmount
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while validating the coupon'
        });
    }
}

export default validateCoupon;
