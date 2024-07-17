import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const pointSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true },
  reason: { type: String }, // Opcional
}, { timestamps: true });

const Point = model('Point', pointSchema);
export default Point;
