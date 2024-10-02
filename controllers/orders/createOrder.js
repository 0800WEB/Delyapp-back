import Order from '../../models/Order.js';
import Product from '../../models/Product.js';
import Cart from '../../models/Cart.js';
import { handleCouponUsage } from '../../utils/couponUtils.js';  // Importar la función utilitaria
import { validateCartProducts } from '../../utils/productUtils.js'; // Importar la función utilitaria
import { clearCart } from '../../utils/clearCart.util.js'; // Importar la función utilitaria

const createOrder = async (req, res) => {
    const { cartId, deliveryAddress, paymentMethod, couponId = null, nota } = req.body;
    const userId = req.user._id.toString();

    try {
        // Validar que el carrito exista
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
        }

        // Validar productos y calcular el precio total
        const { validatedProducts, totalPrice: initialTotalPrice } = await validateCartProducts(cart.products);

        let totalPrice = initialTotalPrice;

        // Si hay un cupón, aplicar el descuento correspondiente
        let coupon = null;
        if (couponId) {
            coupon = await handleCouponUsage(couponId, userId);

            if (coupon.discountPercentage && coupon.discountPercentage > 0) {
                totalPrice -= totalPrice * (coupon.discountPercentage / 100);
            } else if (coupon.discountAmount && coupon.discountAmount > 0) {
                totalPrice -= coupon.discountAmount;
            }

            if (totalPrice < 0) totalPrice = 0;
        }

        // Crear la orden con o sin cupón
        const newOrder = new Order({
            user: userId,
            products: validatedProducts,
            totalPrice,
            deliveryAddress,
            paymentMethod,
            coupon: coupon ? {
                code: coupon.code,
                discountPercentage: coupon.discountPercentage,
                discountAmount: coupon.discountAmount
            } : null
        });

        if (nota) newOrder.nota = nota;

        await newOrder.save();

        // Limpiar el carrito del usuario después de crear la orden
        await clearCart(userId);

        return res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Ocurrió un error al crear la orden, por favor intente de nuevo' });
    }
};

export default createOrder;
