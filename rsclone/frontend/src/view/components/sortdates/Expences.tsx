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
  return (
    <article className='sortes-route sortes__expences'>
      <h3 className='sourtes__title'>List of expenses</h3>
      <div className='list-expences'>
        {dataIntroExpences.map((position) => (
          <ul className='list-expences__item' key={dataIntroExpences.indexOf(position)}>
            <li className='list-expences__item_number'>{dataIntroExpences.indexOf(position) + 1}</li>
            <li className='list-expences__item_date'>{position.date.slice(0, 10)}</li>
            <li className='list-expences__item_title'>{position.category}</li>
            <li className='list-expences__item_amount'>
              {position.amount}
              $
            </li>
          </ul>
        ))}
      </div>
    </article>
  );
};
