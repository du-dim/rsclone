import React from 'react';
import { IBody } from '../../../types/types';
import './sortdates.scss';

type IProps = {
  dataInfo: IBody[],
  dateStart: string,
  dateEnd: string,
}

export const All = ({ dateStart, dateEnd, dataInfo }: IProps) => {
  const numDateStart = Number(dateStart.replace(/-/g, ''));
  const numDateEnd = Number(dateEnd.replace(/-/g, ''));
  const dataIntroAllOperations = dataInfo
    .filter((operation) => operation.amount)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) <= numDateEnd)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) >= numDateStart);
  return (
    <article className='sortes-route sortes__all'>
      <h3 className='sourtes__title'>List of revenues and expenses</h3>
      <div className='list-all'>
        {dataIntroAllOperations.map((position) => (
          <ul className='list-all__item' key={dataIntroAllOperations.indexOf(position)}>
            <li className='list-all__item_number'>{dataIntroAllOperations.indexOf(position) + 1}</li>
            <li className='list-all__item_date'>{position.date.slice(0, 10)}</li>
            <li className='list-all__item_title'>{position.category}</li>
            <li className='list-all__item_amount'>
              {position.amount }
              $
            </li>
          </ul>
        ))}
      </div>
    </article>
  );
};
