import Product from '../../models/Product.js';
import Cart from '../../models/Cart.js';
import Order from '../../models/Order.js';

const repeatOrder = async (req, res) => {
    const { orderId } = req.params;  // Tomamos el ID de la orden
    const userId = req.user._id.toString(); 

    try {
        // Encontrar la orden por ID
        const order = await Order.findById(orderId).populate('products.product');
        if (!order) {
            return res.status(404).json({ success: false, message: 'Orden no encontrada' });
        }

        // Verificar que la orden pertenece al usuario actual
        if (order.user.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'No tienes permiso para repetir esta orden' });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [], totalPrice: 0 });
        }

        if (!Array.isArray(cart.products)) {
            cart.products = [];
        }

        // Añadir cada producto de la orden al carrito
        for (const orderProduct of order.products) {
            const productId = orderProduct.product._id;
            const quantity = orderProduct.quantity;

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: `Producto ${productId} no encontrado` });
            }

            if (product.stock < quantity) {
                return res.status(400).json({ success: false, message: `Producto ${product.name} sin stock suficiente` });
            }

            // Verificar si el producto ya está en el carrito
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex > -1) {
                // Si ya está en el carrito, actualizamos la cantidad
                cart.products[productIndex].quantity += quantity;
            } else {
                // Si no está en el carrito, lo añadimos
                cart.products.push({ product: productId, quantity });
            }
        }

        // Calcular el precio total del carrito
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
        console.error("Error al repetir la orden:", error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default repeatOrder;
