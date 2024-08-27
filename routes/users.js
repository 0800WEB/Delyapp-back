import express from 'express';
import accountExistsSignUp from '../middlewares/accountSignUp.js';
import signUp from '../controllers/users/signUp.js';
import signin from '../controllers/users/signIn.js';
import signOut from '../controllers/users/signOut.js';
import userIsVerified from '../controllers/users/isVerified.js';
import resetPassword from '../controllers/users/resetPassword.js';
import verifyCurrentPassword from '../middlewares/verifyCurrentPassword.js';
import reSend from '../controllers/users/reSendEmail.js';
import passport from '../middlewares/passport.js';
import passwordIsOk from '../middlewares/passwordIsOk.js';
import accountExistsSignIn from '../middlewares/accountSignIn.js';
import { getOneUser, getUsers, getTotalCustomers } from '../controllers/users/getUsers.js';
import createAdmin from '../controllers/users/createAdmin.js';
import isAdmin from '../middlewares/isAdmin.js'
import validator from '../middlewares/validator.js';
import { userSignUp } from '../schemas/users.js'
//import forgotPassword from '../controllers/users/forgotPassword.js'
import updateUser from '../controllers/users/updateUser.js';
const router = express.Router();

/* GET users listing. */
router.post('/signup', accountExistsSignUp, validator(userSignUp), signUp);
router.post('/signin', accountExistsSignIn, passwordIsOk, signin)
router.post('/verify/resend_code', reSend)
router.patch('/verify/:verify_code', userIsVerified)
router.post('/reset_password', passport.authenticate('jwt', { session: false }), verifyCurrentPassword, resetPassword)
router.post('/signout', passport.authenticate('jwt', { session: false }), signOut)
router.patch('/update', passport.authenticate('jwt', { session: false }), updateUser)
router.put('/create-admin/:id', passport.authenticate('jwt', { session: false }),isAdmin, createAdmin)
router.get('/', passport.authenticate('jwt', { session: false }),isAdmin, getUsers)
router.get('/total-customers', passport.authenticate('jwt', { session: false }),isAdmin, getTotalCustomers)
router.get('/get-one-user',passport.authenticate('jwt', { session: false }),isAdmin, getOneUser)
//router.post('/forgot_password', forgotPassword)

export default router;