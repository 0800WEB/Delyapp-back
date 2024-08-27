import stripe from 'stripe';

const stripeSecretKey = process.env.PRIVATE_KEY_STRIPE;
const stripeClient = new stripe(stripeSecretKey);

const createCheckoutSession = async (req, res) => {
  console.log(stripeSecretKey)
  try {
    const { totalAmount, customerEmail } = req.body
   /*    console.log(req.body)
    const session = await stripeClient.checkout.sessions.create({
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            unit_amount: (totalAmount * 100),
            product_data: {
              name: 'Carrito de prueba',
            },
            currency: 'usd',
            automatic_payment_methods:{
              enabled: true
            }
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/success`,
      cancel_url: 'http://localhost:5173/failed',
    });


    res.json(200, session);
    console.log(session); */
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount:totalAmount,
      currency:'mxn',
      automatic_payment_methods:{
        enabled:true
      }
    })
    res.json(200, paymentIntent.client_secret)
  } catch (error) {
    console.error('Error al crear sesion de pago:', error.message);
    res.status(500).send('Error al crear sesion de pago');
  }
};

export default createCheckoutSession;