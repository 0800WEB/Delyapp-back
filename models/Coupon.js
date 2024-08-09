import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  expiryDate: { type: Date, required: true },
  usageLimit: { type: Number, default: 1 }
});

const Coupon = model('Coupon', couponSchema);
export default Coupon;