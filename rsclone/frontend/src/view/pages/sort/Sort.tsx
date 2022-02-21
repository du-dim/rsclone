/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import React, { useEffect, useState } from 'react';
import {
  NavLink, Route, Routes, useNavigate,
} from 'react-router-dom';
import { IBody } from '../../../types/types';
import { All } from '../../components/sortdates/All';
import { Expences } from '../../components/sortdates/Expences';
import { Incomes } from '../../components/sortdates/Incomes';
import './sort.scss';

type IProps = {
  dataInfo: IBody[],
}

export const Sort = ({ dataInfo }: IProps) => {
  const time = new Date().getTime() + 3 * 60 * 60 * 1000;
  const today = new Date(time).toISOString().split('T')[0];
  const [dateStart, setDateStart] = useState(new Date(time - 604800000).toISOString().split('T')[0]);
  const [dateEnd, setDateEnd] = useState(today);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/sorts/all');
  }, []);

  const [valueSearch, setValueSearch] = useState<string>('');

  return (
    <section className='sortes'>
      <div className='container'>
        <div className='sortes-date'>
          <h3 className='sortes-date__title'>Accounting</h3>
          <input
            className='info-box__search'
            type='search'
            placeholder='Search'
            onChange={(event) => setValueSearch(event.target.value)}
          />
          <div className='sortes-box'>
            <div className='box-start'>
              <h3 className='date-box__title'>From</h3>
              <input
                className='box-start__input'
                type='date'
                name=''
                id=''
                value={dateStart}
                max={dateEnd}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className='box-end'>
              <h3 className='date-box__title'>To</h3>
              <input
                className='box-end__input'
                type='date'
                name=''
                id=''
                value={dateEnd}
                min={dateStart}
                max={today}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
          </div>
          <nav>
            <ul className='sort-links'>
              <li>
                <NavLink
                  to='/sorts/expences'
                  className='sort-links__item sort-links__item_expences'
                >
                  <span className='sort-links__span'>Expenses</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/sorts/all'
                  className='sort-links__item sort-links__item_all'
                >
                  <span className='sort-links__span'>All</span>
                </NavLink>

              </li>
              <li>
                <NavLink
                  to='/sorts/incomes'
                  className='sort-links__item sort-links__item_incomes'
                >
                  <span className='sort-links__span'>Incomes</span>
                </NavLink>

              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path='/expences'
              element={(
                <Expences
                  dataInfo={dataInfo}
                  dateEnd={dateEnd}
                  dateStart={dateStart}
                  valueSearch={valueSearch}
                />
)}
            />
            <Route
              path='all'
              element={(
                <All
                  dataInfo={dataInfo}
                  dateEnd={dateEnd}
                  dateStart={dateStart}
                  valueSearch={valueSearch}
                />
)}
            />
            <Route
              path='incomes'
              element={(
                <Incomes
                  dataInfo={dataInfo}
                  dateEnd={dateEnd}
                  dateStart={dateStart}
                  valueSearch={valueSearch}
                />
)}
            />
          </Routes>
        </div>
      </div>
    </section>
  );
};
