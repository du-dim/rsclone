/* eslint-disable camelcase */
import { Router, Request, Response } from 'express';
import { Balans } from './db-model/Balans';

interface IBody {
  amount: number,
  currency: string,
  date: Date,
  category: string,
  note: string,
  user_id: string,
  USD: number,
  EUR: number,
  RUB: number,
  UAH: number,
  PLN: number,
  GBP: number,
  CNY: number,
  BYN: number,
}

const routerBalans = Router();

routerBalans.post('/balans', async (req: Request, res: Response) => {
  try {
    const {
      amount, currency, date, category, note, user_id, USD, EUR, RUB, UAH, PLN, GBP, CNY, BYN,
    } = req.body as IBody;
    const balans = new Balans({
      amount, currency, date, category, note, user_id, USD, EUR, RUB, UAH, PLN, GBP, CNY, BYN,
    });
    await balans.save();
    const balansUser = await Balans.find({ user_id });
    res.json(balansUser);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

routerBalans.post('/databalans', async (req: Request, res: Response) => {
  try {
    const {
      user_id,
    } = req.body as IBody;
    const balansUser = await Balans.find({ user_id });
    res.json(balansUser);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default routerBalans;
