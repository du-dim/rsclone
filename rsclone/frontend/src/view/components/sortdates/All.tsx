/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import React, { useState } from 'react';
import './sortdates.scss';
import './modalSort.scss';
import { IBody } from '../../../types/types';

type IProps = {
  dataInfo: IBody[];
  dateStart: string;
  dateEnd: string;
  valueSearch: string,

};

export const All = ({
  dateStart, dateEnd, dataInfo, valueSearch,
}: IProps) => {
  const [modalActive, setModalActive] = useState(false);
  const turnModal = () => {
    setModalActive(true);
  };

  const [activeItem, setActiveItem] = useState<IBody>();

  const numDateStart = Number(dateStart.replace(/-/g, ''));
  const numDateEnd = Number(dateEnd.replace(/-/g, ''));
  const dataIntroAllOperations = dataInfo
    .filter((operation) => operation.amount)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) <= numDateEnd)
    .filter((operation) => +(operation.date.split('T')[0].replace(/-/g, '')) >= numDateStart);

  const filterSearch = dataIntroAllOperations.filter((item) => {
    return (item.category.toLocaleLowerCase().includes(valueSearch.toLocaleLowerCase())
      || (((String(item.amount)).includes(valueSearch))));
  });
  return (
    <article className='sortes-route sortes__all'>
      <h3 className='sourtes__title'>List of revenues and expenses</h3>
      <div className='list-all'>
        {filterSearch.map((position) => (
          <div className='list-all__item' key={dataIntroAllOperations.indexOf(position)}>
            {/* <li className='list-all__item_number'>{dataIntroAllOperations.indexOf(position) + 1}</li> */}
            <div className='date-info'>
              <div className='list-all__item_date'>
                {(position.date.slice(0, 10))
                  .replace(/^(\d+)-(\d+)-(\d+)$/, '$3.$2.$1')}

              </div>
              <div
                className='list-all__item_btn'
                onClick={() => {
                  turnModal();
                  setActiveItem(position);
                }}
              />
            </div>
            <div className=''>{position.category}</div>
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
