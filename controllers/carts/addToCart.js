import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

const addToCart = async (req, res, next) => {
    const userId = req.user._id; // Asumiendo que el ID del usuario está disponible en req.user
    const { productId, quantity } = req.body;

    try {
        // Verificar si el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Buscar el carrito del usuario
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // Si el carrito no existe, crear uno nuevo
            cart = new Cart({
                user: userId,
                products: [],
                totalPrice: 0
            });
        }

        // Verificar si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        
        if (productIndex > -1) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            cart.products[productIndex].quantity += quantity;
        } else {
            // Si el producto no está en el carrito, añadirlo
            cart.products.push({ product: productId, quantity });
        }

        // Calcular el precio total
        cart.totalPrice = cart.products.reduce((total, item) => {
            return total + item.quantity * product.price;
        }, 0);

        // Guardar el carrito
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product added to cart',
            cart
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding to cart'
        });
    }
}

export default addToCart;
