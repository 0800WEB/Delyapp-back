import express from 'express';
import { getUsers } from '../controllers/users/READ.js';
import { createUser } from '../controllers/users/CREATE.js';
import { updateUser } from '../controllers/users/UPDATE.js';
import { deleteUser } from '../controllers/users/DELETE.js';
import accountExistsSignUp from '../middlewares/accountSignUp.js';
import signUp from '../controllers/users/signUp.js';
import signin from '../controllers/users/signIn.js';
import userIsVerified from '../controllers/users/isVerified.js';
import reSend from '../controllers/users/reSendEmail.js';
const router = express.Router();

/* GET users listing. */
router.get('/', getUsers);
router.post('/signup', accountExistsSignUp, signUp);
router.post('/signin', signin)
router.post('/verify/resend_code', reSend)
router.put('/verify/:verify_code', userIsVerified)
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;
