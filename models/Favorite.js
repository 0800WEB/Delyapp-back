import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const favoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }]
}, { timestamps: true });

const Favorite = model('Favorite', favoriteSchema);
export default Favorite;
