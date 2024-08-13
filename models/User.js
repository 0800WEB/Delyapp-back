import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: Number, required: true, default:0 },
  is_online: { type: Boolean, required: true },
  ageVerified: { type: Boolean, default: false },
  is_verified: { type: Boolean, required: true },
  verify_code: { type: Number, required: true }
}, { timestamps: true });

const User = model('User', userSchema);
export default User;
