import Coupon from '../../models/Coupon.js'
const totalCoupons = async(req,res)=>{
    try {
        let couponsQuantity = await Coupon.countDocuments() 
        res.status(200).json(couponsQuantity)
    } catch (error) {
        return res.status(500).json({
            message: "error interno en el servidor",
            success: false
        })
    }
}
export default totalCoupons