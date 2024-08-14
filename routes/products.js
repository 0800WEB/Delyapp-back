import express from 'express';
//import read from '../controllers/products/read.js' // Este era el read viejo (no funcionaba bien)
import readOne from '../controllers/products/readOne.js'
import passport from '../middlewares/passport.js';
import createProduct from '../controllers/products/createProducts.js';
import updateProduct from '../controllers/products/updateProducts.js';
import deleteProduct from '../controllers/products/deleteProducts.js';
import getAllProducts from '../controllers/products/getProducts.js';

const router = express.Router();

//router.get('/',  passport.authenticate('jwt', { session: false }), read);
router.get('/:id',  passport.authenticate('jwt', { session: false }), readOne);
router.post("/create",  passport.authenticate('jwt', { session: false }), createProduct)
router.put("/:id", passport.authenticate('jwt', { session: false }),  updateProduct)
router.delete("/:id",  passport.authenticate('jwt', { session: false }), deleteProduct)
router.get("/", passport.authenticate('jwt', { session: false }), getAllProducts)

export default router