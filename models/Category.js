import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description:{type:String, required: true},
  /* promotions: [{
    code: { type: String, required: true },
    discountPercentage: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    expiryDate: { type: Date },
    usageLimit: { type: Number, default: 1 }
  }], */
}, { timestamps: true });

const Category = model('Category', categorySchema);
export default Category;
