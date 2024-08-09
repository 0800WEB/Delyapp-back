import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

const removeFromCart = async (req, res, next) => {
    const userId = req.user._id; // Asumiendo que el ID del usuario está disponible en req.user
    const { productId } = req.body;

    try {
        // Buscar el carrito del usuario
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        // Verificar si el producto está en el carrito
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in cart'
            });
        }

        // Eliminar el producto del carrito
        cart.products.splice(productIndex, 1);

        // Calcular el precio total
        cart.totalPrice = cart.products.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);

        // Guardar el carrito
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product removed from cart',
            cart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while removing from cart'
        });
    }
}

export default removeFromCart;
