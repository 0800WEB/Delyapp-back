import express from 'express';
import passport from '../middlewares/passport.js';
import validator from '../middlewares/validator.js';
import accountExistsSignUp from '../middlewares/accountSignUp.js';
import accountExistsSignIn from '../middlewares/accountSignIn.js';
import verifyCurrentPassword from '../middlewares/verifyCurrentPassword.js';
import passwordIsOk from '../middlewares/passwordIsOk.js';
import isAdmin from '../middlewares/isAdmin.js';

import signUp from '../controllers/users/signUp.js';
import signIn from '../controllers/users/signIn.js';
import signOut from '../controllers/users/signOut.js';
import userIsVerified from '../controllers/users/isVerified.js';
import resetPassword from '../controllers/users/resetPassword.js';
import reSend from '../controllers/users/reSendEmail.js';
import createAdmin from '../controllers/users/createAdmin.js';
import updateUser from '../controllers/users/updateUser.js';
import adminConvert from '../controllers/users/adminConvert.js';
import { deleteUser, deleteUsers } from '../controllers/users/deleteUsers.js';
import getMyData from '../controllers/users/getMyData.js';
import { getOneUser, getUsers, getTotalCustomers, getCustomer } from '../controllers/users/getUsers.js';
import { userSignUp } from '../schemas/users.js';

const router = express.Router();

// Authentication Routes
router.post('/signup', accountExistsSignUp, validator(userSignUp), signUp);
router.post('/signin', accountExistsSignIn, passwordIsOk, signIn);
router.post('/signout', passport.authenticate('jwt', { session: false }), signOut);

// User Verification Routes
router.post('/verify/resend_code', reSend);
router.patch('/verify/:verify_code', userIsVerified);

// Password Management Routes
router.post('/reset_password', passport.authenticate('jwt', { session: false }), verifyCurrentPassword, resetPassword);

// User Management Routes
router.get('/me', passport.authenticate('jwt', { session: false }), isAdmin, getMyData);
router.patch('/update', passport.authenticate('jwt', { session: false }), updateUser);
router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, getUsers);
router.get('/total-customers', passport.authenticate('jwt', { session: false }), isAdmin, getTotalCustomers);
router.get('/get-one-user', passport.authenticate('jwt', { session: false }), isAdmin, getOneUser);
router.get('/:id', passport.authenticate('jwt', { session: false }), isAdmin, getCustomer);
// Admin Management Routes
router.put('/create-admin/:id', passport.authenticate('jwt', { session: false }), isAdmin, createAdmin);
router.post('/:id', passport.authenticate('jwt', { session: false }), isAdmin, adminConvert);

// User Deletion Routes
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteUser);
router.delete('/', passport.authenticate('jwt', { session: false }), isAdmin, deleteUsers);

// Optional: Forgot Password Route
// router.post('/forgot_password', forgotPassword);

export default router;
