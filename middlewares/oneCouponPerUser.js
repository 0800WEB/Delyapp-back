import Coupon from "../models/Coupon";

const oneCouponPerUser = async (req, res, next) => {
    try {
        const { code } = req.body;
        const userId = req.user._id.toString(); // Obtenemos el userId desde req.user

        // Buscamos un cupón que coincida con el código y que tenga el userId en su array de users
        const couponUsed = await Coupon.findOne({ code: code, users: userId });

        if (couponUsed) {
            return res.status(400).json({
                success: false,
                message: "Este cupón ya ha sido utilizado. No se puede volver a usar."
            });
        }

        // Si no se encuentra el cupón, continuar con la siguiente middleware o lógica
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Hubo un problema al procesar tu cupón. Por favor, intenta nuevamente más tarde."
        });
    }
};

export default oneCouponPerUser;
