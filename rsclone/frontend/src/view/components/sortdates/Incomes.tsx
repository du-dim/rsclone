/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import React, { useState } from 'react';
import { IBody } from '../../../types/types';
import './sortdates.scss';

type IProps = {
  dataInfo: IBody[],
  dateStart: string,
  dateEnd: string,
  valueSearch:string,
  }

export const Incomes = ({
  dateStart, dateEnd, dataInfo, valueSearch,
}: IProps) => {
  const [modalActive, setModalActive] = useState(false);
  const turnModal = () => {
    setModalActive(true);
  };
  const [activeItem, setActiveItem] = useState<IBody>();

  const numDateStart = Number(dateStart.replace(/-/g, ''));
  const numDateEnd = Number(dateEnd.replace(/-/g, ''));
  const dataIntroIncomes = dataInfo
    .filter((operation) => operation.amount > 0)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) <= numDateEnd)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) >= numDateStart);

  const filterSearch = dataIntroIncomes.filter((item) => {
    const strSearch = (item.category + item.amount + item.currency + item.note).toLocaleLowerCase();
    return (strSearch.includes(valueSearch.toLocaleLowerCase()));
  });

  return (
    <article className='sortes-route sortes__revenue'>
      <h3 className='sortes-route__title'>List of revenues</h3>
      <div className='list-operation'>
        {filterSearch.map((position) => (
          <div className='item' key={dataIntroIncomes.indexOf(position)}>
            {/* <li className='list-revenue__item_number'>{dataIntroIncomes.indexOf(position) + 1}</li> */}
            <div className='item-info'>
              <div className='item-info__date'>
                {(position.date.slice(0, 10))
                  .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')}
              </div>
              <div
                className='item-info__btn'
                onClick={() => {
                  turnModal();
                  setActiveItem(position);
                }}
              />
            </div>
            <div className='item-info__category'>{(position.category).substring(0, 10)}</div>
            <div className={position.amount < 0 ? 'red-active' : 'green-active'}>
              {Number((position.amount).toFixed(2))}
              $
              </div>
          </div>
        ))}
      </div>
      <div
        className={modalActive ? 'modal-sorts active' : 'modal-sorts'}
        onClick={() => setModalActive(false)}
      >
        <div
          className={modalActive ? 'modal-content active' : 'modal-content'}
          onClick={(e) => e.stopPropagation}
        >
          <div className='info'>
            <div className='modal-item' key={activeItem?._id}>
              <div>
                {`date: ${activeItem?.date.slice(0, 10)
                  .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')}`}
              </div>
              <div>{`amount: ${activeItem?.amount}`}</div>
              <div>{`${activeItem?.currency}`}</div>
              <div>{`category: ${activeItem?.category}`}</div>
              <div>{`note: ${activeItem?.note}`}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
