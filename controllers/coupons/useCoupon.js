import Coupon from '../../models/Coupon.js';

const useCoupon = async (req, res) => {
    const { code } = req.params;
    const userId = req.user._id.toString(); // Asumiendo que tienes el userId en req.user gracias a passport

    try {
        const coupon = await Coupon.findOne({ code: code });
        // Verificar si el cupón existe
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'Cupón no encontrado'
            });
        }

        // Verificar si el usuario ya usó el cupón
        if (coupon.users.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Este cupón ya ha sido utilizado por este usuario.'
            });
        }

        // Reducir el límite de uso del cupón
        parseInt(coupon.usageLimit) -= 1;

        // Agregar el usuario al arreglo de usuarios que han usado el cupón
        coupon.users.push(userId);

        // Guardar los cambios en el cupón
        await coupon.save();

        return res.status(200).json({
            success: true,
            message: 'Has usado tu cupón de descuento',
            discountPercentage: coupon.discountPercentage,
            discountAmount: coupon.discountAmount
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al validar el cupón'
        });
    }
}

export default useCoupon;
