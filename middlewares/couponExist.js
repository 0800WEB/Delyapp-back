import Coupon from '../models/Coupon.js';

const couponExist = async(req, res, next) => {
    try {
        let { code } = req.params
        const coupon = await Coupon.findOne({ code:code });
        if (!coupon ) {
            return res.status(404).json({
                success: false,
                message: 'El cupón no ha sido encontrado'
            });
        }
       next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Ocurrio un error al leer el cupón'
        });
    }
}
export default couponExist