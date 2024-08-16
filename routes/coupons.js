import express from 'express'
import useCoupon from '../controllers/coupons/useCoupon.js'
import createCoupon from '../controllers/coupons/createCoupon.js'
import passport from '../middlewares/passport.js';
import {couponSchema} from '../schemas/coupons.js'
import validator from '../middlewares/validator.js';
import getCoupons from '../controllers/coupons/getCoupons.js';
import deleteCoupon from '../controllers/coupons/deleteCoupon.js'
import isAdmin from '../middlewares/isAdmin.js'
import readCoupon from '../controllers/coupons/readCoupon.js';
import oneCouponPerUser from '../middlewares/oneCouponPerUser.js';
let router = express.Router()

router.get('/all-coupons',passport.authenticate('jwt', { session: false }),isAdmin, getCoupons )
router.post('/:code', passport.authenticate('jwt', { session: false }), useCoupon)
router.post('/',  passport.authenticate('jwt', { session: false }),isAdmin,validator(couponSchema), createCoupon)
router.delete('/:id',passport.authenticate('jwt', { session: false }), isAdmin, deleteCoupon )
router.get('/:code',passport.authenticate('jwt', { session: false }), oneCouponPerUser, readCoupon)

export default router