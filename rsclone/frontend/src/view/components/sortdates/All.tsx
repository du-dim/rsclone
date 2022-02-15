import React from 'react';
import { IBody } from '../../../types/types';
import './sortdates.scss';

type IProps = {
  dataInfo: IBody[],
  dateStart: string,
  dateEnd: string,
}

export const All = ({ dateStart, dateEnd, dataInfo }: IProps) => {
  console.log(dataInfo);
  return (
    <article className='sortes-route sortes__all'>Llist of revenues and expenses</article>
  );
};
