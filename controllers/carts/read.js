import Cart from '../../models/Cart.js';

const getCart = async (req, res, next) => {
    const userId = req.user._id; 
    console.log("este es el user id",userId)
    try {
        // Buscar el carrito del usuario con el ID proporcionado
        const cart = await Cart.findOne({user: userId }).populate('products.product');
        console.log("este es el cart",cart)
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Carro de compras no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Ocurrio un error al obtener el carro de compras'
        });
    }
}

export default getCart;

