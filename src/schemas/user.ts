import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const { isEmail } = require('validator');
const { Schema, model } = mongoose;
import { IUser } from '../types/user';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    createIndexes: { unique: true },
    validate: [isEmail, "Mail inválido."]
  },
  animes: [{ type: Number, required: true }],
  password: { type: String, required: true },
});

UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(
  password: string
) {
  return await bcrypt.compare(password, this.password);
}

export const User = model<IUser>("User", UserSchema);
