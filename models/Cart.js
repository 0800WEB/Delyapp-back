import { Schema,model } from 'mongoose'

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true}
}, { timestamps: true });

let Cart = model('Cart', cartSchema);

export default Cart
