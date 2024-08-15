import Order from '../../models/Order.js';
import Product from '../../models/Product.js';
import Cart from '../../models/Cart.js';
import Coupon from '../../models/Coupon.js';
import useCoupon from '../coupons/useCoupon.js';

const createOrder = async (req, res) => {
    const { cartId, deliveryAddress, paymentMethod, couponId = null } = req.body;
    const userId = req.user._id.toString(); 

    try {
        // Validar que el carrito exista
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
        }

        let totalPrice = 0;
        const validatedProducts = [];

        // Validar productos y calcular el precio total
        for (const item of cart.products) {
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

        // Si hay un cupón, aplicar el descuento correspondiente
        if (couponId) {
            const coupon = await Coupon.findById(couponId);
            if (!coupon) {
                return res.status(404).json({ success: false, message: 'Cupón no encontrado' });
            }

            // Verificar el tipo de cupón y aplicar el descuento
            if (coupon.discountPercentage && coupon.discountPercentage > 0) {
                totalPrice -= (totalPrice * (coupon.discountPercentage / 100));
            } else if (coupon.discountAmount && coupon.discountAmount > 0) {
                totalPrice -= coupon.discountAmount;
            }

            // Asegurarse de que el precio total no sea negativo
            if (totalPrice < 0) totalPrice = 0;

            // Marcar el cupón como usado
            await useCoupon();
        }

        // Crear la orden
        const newOrder = new Order({
            user: userId,
            products: validatedProducts,
            totalPrice,
            deliveryAddress,
            paymentMethod,
            coupon: couponId ? couponId : null  // Guardar el ID del cupón si existe
        });

        await newOrder.save();
        return res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Ocurrió un error al crear la orden, por favor intente de nuevo' });
    }
};

export default createOrder;
