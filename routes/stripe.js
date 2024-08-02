import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Access secret key
const router = express.Router();

router.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name:   
 'Malibu',
              description: 'Bebida alcohólica hecha de ron y coco de extrema calidad, ron para la gente que quiere lo bueno y nada más que eso',
            },
            unit_amount: 60 * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000/cancelled',
    });

    console.log(session, "devolucion de datos de stripe:");
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message   
 }); // Optional error handling
  }
});

export default router;