import express from 'express';
import passport from '../middlewares/passport.js';
import toggleFavorite from '../controllers/favorites/toggleFavorite.js';
import removeFromFavorites from '../controllers/favorites/removeFromFavorites.js';
import read from '../controllers/favorites/read.js';

const router = express.Router();

// Ruta para agregar o quitar un producto de los favoritos
router.post('/', passport.authenticate('jwt', { session: false }), toggleFavorite);

// Ruta para eliminar un producto de los favoritos
router.delete('/', passport.authenticate('jwt', { session: false }), removeFromFavorites);

// Ruta para leer la lista de productos favoritos
router.get('/', passport.authenticate('jwt', { session: false }), read);

export default router;
