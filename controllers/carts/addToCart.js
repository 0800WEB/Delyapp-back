import Product from '../../models/Product.js';
import Cart from '../../models/Cart.js';

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id.toString(); 

    console.log(req.body);
    console.log("userid:", userId);

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ success: false, message: 'Producto sin stock' });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [], totalPrice: 0 });
        }

        if (!Array.isArray(cart.products)) {
            cart.products = [];
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {

            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity: quantity });
        }

        let totalPrice = 0;
        for (const item of cart.products) {
            const product = await Product.findById(item.product);
            if (product) {
                totalPrice += product.price * item.quantity;
            }
        }

        cart.totalPrice = totalPrice;
        await cart.save();

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default addToCart;
