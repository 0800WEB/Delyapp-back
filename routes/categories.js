// routes/categories.js
import express from 'express';
import isAdmin from '../middlewares/isAdmin.js'; // Asegúrate de importar correctamente el middleware
import create from '../controllers/categories/create.js';
import read_all from '../controllers/categories/read.js';
import update from '../controllers/categories/update.js';
import deleteCategory from '../controllers/categories/delete.js';

let router = express.Router();

router.get('/', read_all); // Ruta para leer todas las categorías
router.post('/', isAdmin, create); // Ruta para crear una nueva categoría (solo administradores)
router.put('/:id', isAdmin, update); // Ruta para actualizar una categoría (solo administradores)
router.delete('/:id', isAdmin, deleteCategory); // Ruta para eliminar una categoría (solo administradores)

export default router;
