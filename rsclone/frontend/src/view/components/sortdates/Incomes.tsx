import React from 'react';
import { IBody } from '../../../types/types';
import './sortdates.scss';

type IProps = {
  dataInfo: IBody[],
  dateStart: string,
  dateEnd: string,
}

export const Incomes = ({ dateStart, dateEnd, dataInfo }: IProps) => {
  const numDateStart = Number(dateStart.replace(/-/g, ''));
  const numDateEnd = Number(dateEnd.replace(/-/g, ''));
  const dataIntroIncomes = dataInfo
    .filter((operation) => operation.amount > 0)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) <= numDateEnd)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) >= numDateStart);
  console.log(dataIntroIncomes);
  return (
    <article className='sortes-route sortes__incomes'>Incomes</article>
  );
};
