import express from 'express';
import passport from '../middlewares/passport.js';
import addToCart from '../controllers/carts/addToCart.js';
import removeFromCart from '../controllers/carts/removeFromCart.js';
import read from '../controllers/carts/read.js';
import clearCart from '../controllers/carts/clearCart.js';
import updateStock from '../controllers/carts/updateCart.js';
import isAdmin from '../middlewares/isAdmin.js';
import readAll from '../controllers/carts/readAll.js';
import repeatOrder from '../controllers/carts/repeatOrder.js'; 
const router = express.Router();

// Ruta para añadir un producto al carrito
router.post('/', passport.authenticate('jwt', { session: false }), addToCart);

// Ruta para eliminar un producto del carrito
router.delete('/', passport.authenticate('jwt', { session: false }), removeFromCart);

// Ruta para leer el carrito de un usuario
router.get('/', passport.authenticate('jwt', { session: false }), read);

// Ruta para que un administrador lea todos los carritos
router.get('/all', passport.authenticate('jwt', { session: false }), isAdmin, readAll);

// Ruta para vaciar el carrito de un usuario
router.delete('/clear-cart', passport.authenticate('jwt', { session: false }), clearCart);

// Ruta para actualizar la cantidad de productos en el carrito
router.put('/', passport.authenticate('jwt', { session: false }), updateStock);

// Ruta para repetir una orden
router.post('/repeat-order/:orderId', passport.authenticate('jwt', { session: false }), repeatOrder);

export default router;
