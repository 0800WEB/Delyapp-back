import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pendiente' }, // 'pendiente', 'en preparación', 'en camino', 'cancelado', 'entregado
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  coupon: { type: Schema.Types.ObjectId, ref: 'Coupon', default: null } // Opcional, por defecto null
}, { timestamps: true });

const Order = model('Order', orderSchema);
export default Order;
