import Order from '../../models/Order.js';
import Product from '../../models/Product.js';

const createOrder = async (req, res) => {
    const { products, deliveryAddress, paymentMethod } = req.body;
    const userId = req.user._id.toString(); 

    try {
        // Validar que todos los productos existan y calcular el precio total
        let totalPrice = 0;
        const validatedProducts = [];

        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Producto con ID ${item.product} no encontrado` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `Stock insuficiente para el producto ${product.name}` });
            }

            validatedProducts.push({
                product: item.product,
                quantity: item.quantity
            });

            totalPrice += product.price * item.quantity;
        }

        // Crear el pedido
        const newOrder = new Order({
            user: userId,
            products: validatedProducts,
            totalPrice,
            deliveryAddress,
            paymentMethod
        });

        await newOrder.save();
        return res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default createOrder;
