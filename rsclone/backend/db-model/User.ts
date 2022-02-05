import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string,
  email: string,
  password: string,
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const User = model<IUser>('User', userSchema);
