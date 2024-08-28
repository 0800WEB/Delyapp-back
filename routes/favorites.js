import express from 'express';
import passport from '../middlewares/passport.js';

import toggleFavorite from '../controllers/favorites/toggleFavorite.js';
import removeFromFavorites from '../controllers/favorites/removeFromFavorites.js';
import read from '../controllers/favorites/read.js';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), toggleFavorite);
router.delete('/', passport.authenticate('jwt', { session: false }), removeFromFavorites);
router.get('/', passport.authenticate('jwt', { session: false }), read);

export default router