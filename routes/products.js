import express from 'express';
import read from '../controllers/products/read.js'
import readOne from '../controllers/products/readOne.js'
import passport from '../middlewares/passport.js';

const router = express.Router();

router.get('/', read);
router.get('/:id', readOne);

export default router