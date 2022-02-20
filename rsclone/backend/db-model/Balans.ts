import { Schema, model } from 'mongoose';

export interface IBalans {
  amount: number,
  date: Date,
  category: string,
  note: string,
  user_id: Schema.Types.ObjectId,
  USD: number,
  EUR: number,
  RUB: number,
  UAH: number,
  PLN: number,
  GBP: number,
  CNY: number,
  BYN: number,
}

const balans: Schema = new Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  note: { type: String, required: true },
  user_id: { type: String, required: true },
  USD: { type: Number, required: true },
  EUR: { type: Number, required: true },
  RUB: { type: Number, required: true },
  UAH: { type: Number, required: true },
  PLN: { type: Number, required: true },
  GBP: { type: Number, required: true },
  CNY: { type: Number, required: true },
  BYN: { type: Number, required: true },
});

export const Balans = model<IBalans>('Balans', balans);
