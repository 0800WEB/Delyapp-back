import express from 'express';
import createCheckoutSession from '../controllers/payments/checkoutStripe.js'
import passport from 'passport';

const router = express.Router();


router.post('/',createCheckoutSession  )

export default router