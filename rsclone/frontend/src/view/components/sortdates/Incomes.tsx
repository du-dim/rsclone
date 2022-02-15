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
  return (
    <article className='sortes-route sortes__revenue'>
      <h3 className='sourtes__title'>List of revenues</h3>
      <div className='list-revenue'>
        {dataIntroIncomes.map((position) => (
          <ul className='list-revenue__item' key={dataIntroIncomes.indexOf(position)}>
            <li className='list-revenue__item_number'>{dataIntroIncomes.indexOf(position) + 1}</li>
            <li className='list-revenue__item_date'>{position.date.slice(0, 10)}</li>
            <li className='list-revenue__item_title'>{position.category}</li>
            <li className='list-revenue__item_amount'>
              {position.amount}
              $
            </li>
          </ul>
        ))}
      </div>
    </article>
  );
};
