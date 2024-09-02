import Order from '../../models/Order.js'
const totalOrders = async(req,res)=>{
    try {
        let ordersQuantity = await Order.countDocuments() 
        res.status(200).json(ordersQuantity)
    } catch (error) {
        return res.status(500).json({
            message: "error interno en el servidor",
            success: false
        })
    }
}
export default totalOrders