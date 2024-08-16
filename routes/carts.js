import express from 'express';
import passport from '../middlewares/passport.js';
import addToCart from '../controllers/carts/addToCart.js';
import removeFromCart from '../controllers/carts/removeFromCart.js';
import read from '../controllers/carts/read.js';
import clearCart from '../controllers/carts/clearCart.js';
import updateStock from '../controllers/carts/updateCart.js';
import isAdmin from '../middlewares/isAdmin.js'
import readAll from '../controllers/carts/readAll.js'
const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), addToCart);
router.delete('/', passport.authenticate('jwt', { session: false }), removeFromCart);
router.get('/:id',passport.authenticate('jwt', { session: false }), read);
router.get('/',passport.authenticate('jwt', { session: false }), isAdmin, readAll);
router.delete('/clear-cart',passport.authenticate('jwt', { session: false }),clearCart )
router.put('/', passport.authenticate('jwt', { session: false }), updateStock)

export default router