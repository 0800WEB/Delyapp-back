import express from 'express';
import passport from '../middlewares/passport.js';
import isAdmin from '../middlewares/isAdmin.js';
import validator from '../middlewares/validator.js';
import createCoupon from '../controllers/coupons/createCoupon.js';
import getCoupons from '../controllers/coupons/getCoupons.js';
import deleteCoupon from '../controllers/coupons/deleteCoupon.js';
import readCoupon from '../controllers/coupons/readCoupon.js';
import oneCouponPerUser from '../middlewares/oneCouponPerUser.js';
import couponExist from '../middlewares/couponExist.js';
import updateCoupon from '../controllers/coupons/updateCoupon.js';
import totalCoupons from '../controllers/coupons/totalCoupons.js';
import { couponSchema } from '../schemas/coupons.js';

const router = express.Router();

// Ruta para obtener el total de cupones disponibles
router.get('/total-coupons', passport.authenticate('jwt', { session: false }), isAdmin, totalCoupons);
// Ruta para obtener todos los cupones (accesible solo por administradores)
router.get('/all-coupons', passport.authenticate('jwt', { session: false }), isAdmin, getCoupons);

// Ruta para crear un nuevo cupón (accesible solo por administradores)
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, validator(couponSchema), createCoupon);

// Ruta para eliminar un cupón por su ID (accesible solo por administradores)
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteCoupon);

// Ruta para actualizar un cupón por su ID (accesible solo por administradores)
router.patch('/:id', passport.authenticate('jwt', { session: false }), isAdmin, updateCoupon);

// Ruta para redimir un cupón usando su código (accesible por cualquier usuario autenticado)
router.post('/:code', passport.authenticate('jwt', { session: false }), couponExist, oneCouponPerUser, readCoupon);

export default router;
