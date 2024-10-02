import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  nota: { type: String },
  coupon: {
    code: { type: String },
    discountPercentage: { type: Number },
    discountAmount: { type: Number }
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = model('Order', orderSchema);
export default Order;
