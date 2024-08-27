import Cart from '../models/Cart.js'

export const emptyCart = async (req, res, next) => {
    const cart = await Cart.findOne({user:req.user.id})
    console.log(cart)
    if(cart?.products?.length > 0){
        return next()
    }
    return res.status(400).json({
        success:false,
        message: 'Cart empty'
    })
}