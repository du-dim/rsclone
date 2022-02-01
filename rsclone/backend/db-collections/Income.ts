import { Schema, model } from 'mongoose';
import { IExpense } from './Expense';

const incomeSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  note: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
});
const Income = model<IExpense>('Income', incomeSchema);

export default Income;
