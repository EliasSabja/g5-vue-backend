import mongoose from 'mongoose';
const { isEmail } = require('validator');
const { Schema, model } = mongoose;
import { IReview, ReviewKey } from '../types/review';
import { User } from '../schemas/user';

const ReviewSchema = new Schema<IReview>({
  key: { unique: true, type: Schema.Types.Mixed, required: true },
  text: { type: String, required: true },
});

ReviewSchema.pre("save", async function save(next) {
  try {
    const user = await User.findOne({ email: this.key.email });
    if (!user) throw Error("El usuario que está escribiendo la review no existe.");
    return next();
  } catch (err: any) {
    return next(err);
  }
});

export const Review = model<IReview>("Review", ReviewSchema);
