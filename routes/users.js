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

//import forgotPassword from '../controllers/users/forgotPassword.js'

const router = express.Router();

/* GET users listing. */
router.post('/signup', accountExistsSignUp, signUp);
router.post('/signin', accountExistsSignIn, passwordIsOk, signin)
router.post('/verify/resend_code', passport.authenticate('jwt', { session: false }), reSend)
router.patch('/verify/:verify_code', passport.authenticate('jwt', { session: false }), userIsVerified)
router.post('/reset_password', passport.authenticate('jwt', { session: false }), verifyCurrentPassword, resetPassword)
router.post('/signout', passport.authenticate('jwt', { session: false }), signOut)
router.patch('/update', passport.authenticate('jwt', { session: false }), signOut)
//router.post('/forgot_password', forgotPassword)

export default router;
