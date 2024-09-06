import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const couponSchema = new Schema({
  title: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  expiryDate: { type: Date, required: true },
  usageLimit: { type: Number, default: 1 },
  users:[{type: Schema.Types.ObjectId, ref: 'User'}]
});

const Coupon = model('Coupon', couponSchema);
export default Coupon;