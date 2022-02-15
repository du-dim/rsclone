import React from 'react';
import { IBody } from '../../../types/types';
import './sortdates.scss';

type IProps = {
  dataInfo: IBody[],
  dateStart: string,
  dateEnd: string,
}

export const Expences = ({ dateStart, dateEnd, dataInfo }: IProps) => {
  const numDateStart = Number(dateStart.replace(/-/g, ''));
  const numDateEnd = Number(dateEnd.replace(/-/g, ''));
  const dataIntroExpences = dataInfo
    .filter((operation) => operation.amount < 0)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) <= numDateEnd)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) >= numDateStart);
  console.log(dataIntroExpences);
  return (
    <article className='sortes-route sortes__expences'>
      <div>{dateStart}</div>
    </article>
  );
};
