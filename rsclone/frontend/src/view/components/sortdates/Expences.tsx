/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import React, { useState } from 'react';
import { IBody } from '../../../types/types';
import './sortdates.scss';

type IProps = {
  dataInfo: IBody[],
  dateStart: string,
  dateEnd: string,
  valueSearch: string,
}

export const Expences = ({
  dateStart, dateEnd, dataInfo, valueSearch,
}: IProps) => {
  const [modalActive, setModalActive] = useState(false);

  const turnModal = () => {
    setModalActive(true);
  };
  const [activeItem, setActiveItem] = useState<IBody>();
  const numDateStart = Number(dateStart.replace(/-/g, ''));
  const numDateEnd = Number(dateEnd.replace(/-/g, ''));
  const dataIntroExpences = dataInfo
    .filter((operation) => operation.amount < 0)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) <= numDateEnd)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) >= numDateStart);
  const filterSearch = dataIntroExpences.filter((item) => {
    const strSearch = (item.category + item.amount + item.currency + item.note).toLocaleLowerCase();
    return (strSearch.includes(valueSearch.toLocaleLowerCase()));
  });
  return (
    <div className='sortdata'>
      <h3 className='sortdata__title'>List of expenses</h3>
      <div className='sortdata__list'>
        {filterSearch.map((position) => (
          <div
            className='item'
            key={dataIntroExpences.indexOf(position)}
            onClick={() => {
              turnModal();
              setActiveItem(position);
            }}
          >
            <div className='item__date'>
              {(position.date.slice(0, 10))
                .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')}
            </div>
            <div className='item__category'>{(position.category).substring(0, 10)}</div>
            <div className='item__price'>
              {`${Number((position.amount).toFixed(2))} ${position.currency}`}
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
    </div>
  );
};
