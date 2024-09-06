import Cart from '../../models/Cart.js'
const readAll = async(req, res, next) =>{
    try {
        let carts = await Cart.find()
        if(carts){
            return res.status(200).json({
                success: true,
                carts
            })
        }
        return res.status(400).json({
            success: false,
            message: 'Ocurrió un error al traer los carritos de compra'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error procesando petición"
        })
    }
}
export default readAll