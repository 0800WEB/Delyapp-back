import User from "../../models/User.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

//Actualizar cantidad en el carrito
const updateStock = async (req, res) => {
    const { productId, stock } = req.body;
    const userId = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        if (product.stock < stock) {
            return res.status(400).json({ success: false, message: 'Producto sin stock' });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'El usuario no tiene un carrito activo' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].stock = stock;
            await cart.save();
        } else {
            return res.status(404).json({ success: false, message: 'Producto no disponible en carro de compras' });
        }

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default updateStock