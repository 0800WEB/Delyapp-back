import express from 'express';
import { getUsers } from '../controllers/users/READ.js';
import { createUser } from '../controllers/users/CREATE.js';
import { updateUser } from '../controllers/users/UPDATE.js';
import { deleteUser } from '../controllers/users/DELETE.js';

const router = express.Router();

/* GET users listing. */
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;
