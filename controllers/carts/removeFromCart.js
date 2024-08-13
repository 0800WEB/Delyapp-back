import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

const removeFromCart = async (req, res) => {
    const userId = req.user._id.toString();
    const { productId, quantity } = req.body;

    try {
        // Buscar el carrito del usuario
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Carro de compras no encontrado'
            });
        }

        // Verificar si el producto está en el carrito
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado en el carro de compras'
            });
        }

        const productInCart = cart.products[productIndex];

        if (quantity >= productInCart.quantity) {
            cart.products.splice(productIndex, 1); // Eliminar el producto
        } else {
            productInCart.quantity -= quantity; // Reducir la cantidad
        }

        // Calcular el precio total
        const updatedCart = await Cart.findById(cart._id).populate('products.product');
        cart.totalPrice = await updatedCart.products.reduce(async (totalPromise, item) => {
            const total = await totalPromise;
            const product = await Product.findById(item.product);
            return total + (product.price * item.quantity);
        }, Promise.resolve(0));

        // Guardar el carrito
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Producto eliminado del carrito',
            cart
        });
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al eliminar del carrito'
        });
    }
}

export default removeFromCart;
