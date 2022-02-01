import { Schema, model } from 'mongoose';
import { IUser } from './User';

export interface ICapital {
  amount: number,
  date: Date,
  user_id: IUser['_id']
}
const capitalSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true },
});
const Capital = model<ICapital>('Capital', capitalSchema);

export default Capital;
