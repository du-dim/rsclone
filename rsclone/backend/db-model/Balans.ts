import { Schema, model } from 'mongoose';

export interface IBalans {
  amount: number,
  date: Date,
  category: string,
  note: string,
  user_id: Schema.Types.ObjectId,
}

const balans: Schema = new Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  note: { type: String, required: true },
  user_id: { type: String, required: true },
});

export const Balans = model<IBalans>('Balans', balans);
