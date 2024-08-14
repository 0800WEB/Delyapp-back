import express from 'express';
//import read from '../controllers/products/read.js' // Este era el read viejo (no funcionaba bien)
import readOne from '../controllers/products/readOne.js'
import passport from '../middlewares/passport.js';
import createProduct from '../controllers/products/createProducts.js';
import updateProduct from '../controllers/products/updateProducts.js';
import deleteProduct from '../controllers/products/deleteProducts.js';
import getAllProducts from '../controllers/products/getProducts.js';
import validator from '../middlewares/validator.js'
import {productSchema} from '../schemas/product.js';
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router();

//router.get('/',  passport.authenticate('jwt', { session: false }), read);
router.get('/:id',  passport.authenticate('jwt', { session: false }), readOne);
router.post("/create",  passport.authenticate('jwt', { session: false }),validator(productSchema) ,isAdmin,createProduct)
router.put("/:id", passport.authenticate('jwt', { session: false }),isAdmin,  updateProduct)
router.delete("/:id",  passport.authenticate('jwt', { session: false }),isAdmin, deleteProduct)
router.get("/", passport.authenticate('jwt', { session: false }), getAllProducts)

export default router