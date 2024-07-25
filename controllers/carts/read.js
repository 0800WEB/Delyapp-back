import Cart from '../../models/Cart.js';

const getCart = async (req, res, next) => {
    const userId = req.user._id; // Asumiendo que el ID del usuario está disponible en req.user

    try {
        // Buscar el carrito del usuario
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
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
            message: 'An error occurred while retrieving the cart'
        });
    }
}

export default getCart;
