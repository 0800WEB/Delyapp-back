import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bannerSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

const Banner = model('Banner', bannerSchema);
export default Banner;
