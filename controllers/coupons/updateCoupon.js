import Coupon from "../../models/Coupon.js";

const updateCoupon = async (req, res) => {
    try {
        const {id}=req.params
        const { title,code, discountPercentage, discountAmount, expiryDate, usageLimit } = req.body;
 
        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: '¡Cupon no encontrado!'
            });
        }
        console.log(discountPercentage, discountAmount)
       coupon.title = title || coupon.title
       coupon.code = code || coupon.code
       coupon.discountPercentage = discountPercentage
       coupon.discountAmount = discountAmount
       coupon.expiryDate = expiryDate || coupon.expiryDate
       coupon.usageLimit = usageLimit
        await coupon.save();
        console.log(coupon)
        return res.status(201).json({
            success: true,
            message: '¡Cupon actualizado con éxito!',
            coupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al actualizar el cupon'
        });
    }
};

export default updateCoupon;
