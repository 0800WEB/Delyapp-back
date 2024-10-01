// routes/banners.js
import express from 'express';
import isAdmin from '../middlewares/isAdmin.js'; // Asegúrate de importar correctamente el middleware
import create from '../controllers/banners/create.js';
import read_all from '../controllers/banners/read.js';
import update from '../controllers/banners/update.js';
import passport from '../middlewares/passport.js';
import deleteBanner from '../controllers/banners/delete.js';

let router = express.Router();

router.get('/', read_all); // Ruta para leer todas las categorías
router.post('/', passport.authenticate('jwt', { session: false }),isAdmin, create); // Ruta para crear una nueva categoría (solo administradores)
router.put('/:id', passport.authenticate('jwt', { session: false }),isAdmin, update); // Ruta para actualizar una categoría (solo administradores)
router.delete('/:id', passport.authenticate('jwt', { session: false }),isAdmin, deleteBanner); // Ruta para eliminar una categoría (solo administradores)

export default router;
