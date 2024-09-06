import stripe from 'stripe';
import Cart from '../../models/Cart.js';
import Coupon from '../../models/Coupon.js';

const stripeSecretKey = process.env.PRIVATE_KEY_STRIPE;
const stripeClient = new stripe(stripeSecretKey);

const createCheckoutSession = async (req, res) => {
  const { cartId, couponId } = req.body; // recibir cartId y couponId desde el frontend

  try {
    // Validar que el carrito existe
    const cart = await Cart.findById(cartId).populate('products.product');
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Carrito no encontrado',
      });
    }

    // Calcular el totalAmount usando el precio total del carrito
    let totalAmount = cart.totalPrice; // Iniciamos con el precio total del carrito

    // Si hay un cupón, aplicar el descuento correspondiente
    if (couponId) {
      const coupon = await Coupon.findById(couponId);
      if (coupon) {
        if (coupon.discountPercentage && coupon.discountPercentage > 0) {
          totalAmount -= totalAmount * (coupon.discountPercentage / 100);
        } else if (coupon.discountAmount && coupon.discountAmount > 0) {
          totalAmount -= coupon.discountAmount;
        }
        // Evitar que el totalAmount sea menor que 0
        if (totalAmount < 0) totalAmount = 0;
      }
    }

    // Crear la sesión de pago con Stripe
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // convertir a centavos
      currency: 'mxn', // Puedes ajustar la moneda según tu necesidad
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error al crear sesión de pago:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error al crear sesión de pago',
    });
  }
};

export default createCheckoutSession;
