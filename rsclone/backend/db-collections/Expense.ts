import { Schema, model } from 'mongoose';
import { IUser } from './User';

export interface IExpense {
  amount: number,
  date: Date,
  user_id: IUser['_id']
  category: string,
  note: string
}

const expenseSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  note: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
});
const Expense = model<IExpense>('Expense', expenseSchema);

export default Expense;
