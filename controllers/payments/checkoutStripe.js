import stripe from 'stripe';

const stripeSecretKey = process.env.PRIVATE_KEY_STRIPE;
const stripeClient = new stripe(stripeSecretKey);

const createCheckoutSession = async (req, res) => {
  
  try {
    const { totalUsd, customerEmail } = req.body
      console.log(req.body)
    const session = await stripeClient.checkout.sessions.create({
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            unit_amount: (totalUsd * 100),
            product_data: {
              name: 'Carrito de prueba',
            },
            currency: 'usd',
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5173/success`,
      cancel_url: 'http://localhost:5173/failed',
    });


    res.json(200, session);
    console.log(session);
    
  } catch (error) {
    console.error('Error al crear sesion de pago:', error);
    res.status(500).send('Error al crear sesion de pago');
  }
};

export default createCheckoutSession;