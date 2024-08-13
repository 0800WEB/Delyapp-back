import express from 'express'
import validateCoupon from '../controllers/coupons/validateCoupon.js'

let router = express.Router()

router.get('/', validateCoupon)

export default router