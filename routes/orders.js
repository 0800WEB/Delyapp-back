import express from 'express';
import passport from '../middlewares/passport.js';
import createOrder from '../controllers/orders/createOrder.js';
import updateOrder from '../controllers/orders/updateOrder.js';
import getLastOrders from '../controllers/orders/getLastOrders.js';
//import getAllOrders from '../controllers/orders/getOrders.js';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), createOrder);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateOrder);
router.get('/last-orders', passport.authenticate('jwt', { session: false }), getLastOrders)
//router.get('/', passport.authenticate('jwt', { session: false }), getAllOrders)

export default router;
