import express from 'express';
import passport from '../middlewares/passport.js';
import createProduct from '../controllers/products/createProducts.js';
import updateProduct from '../controllers/products/updateProducts.js';
import deleteProduct from '../controllers/products/deleteProducts.js';
import getAllProducts from '../controllers/products/getProducts.js';
import getTopOrderedProducts from '../controllers/products/getTopOrderedProducts.js';
import readOne from '../controllers/products/readOne.js';
import validator from '../middlewares/validator.js';
import { productSchema } from '../schemas/product.js';
import isAdmin from '../middlewares/isAdmin.js';
import { editProductSchema } from '../schemas/editProduct.js';



const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', passport.authenticate('jwt', { session: false }), getAllProducts);
// Ruta para traer los productos mas pedidos de la sección "lo mas pedido"
router.get('/top-ordered-products', passport.authenticate('jwt', { session: false }), getTopOrderedProducts);

// Ruta para crear un nuevo producto
router.post('/create', passport.authenticate('jwt', { session: false }), isAdmin, validator(productSchema), createProduct);

// Ruta para obtener un producto específico por ID
router.get('/:id', passport.authenticate('jwt', { session: false }), readOne);

// Ruta para actualizar un producto existente por ID
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, validator(editProductSchema), updateProduct);

// Ruta para eliminar un producto por ID
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteProduct);


export default router;
