import express from 'express';
import passport from '../middlewares/passport.js';

import addToCart from '../controllers/carts/addToCart.js';
import removeFromCart from '../controllers/carts/removeFromCart.js';
import read from '../controllers/carts/read.js';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), addToCart);
router.delete('/', passport.authenticate('jwt', { session: false }), removeFromCart);
router.get('/:id', passport.authenticate('jwt', { session: false }), read);

export default router