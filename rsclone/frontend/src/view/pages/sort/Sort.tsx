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
  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });
  const time = new Date().getTime() + 3 * 60 * 60 * 1000;
  const today = new Date(time).toISOString().split('T')[0];
  const [dateStart, setDateStart] = useState(new Date(time - 604800000).toISOString().split('T')[0]);
  const [dateEnd, setDateEnd] = useState(today);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/sorts/all');
  }, []);

  return (
    <section className='sortes'>
      <div className='container'>
        <div className='page-sortes-date'>
          <h3 className='date-title'>{todayDate}</h3>
          <h3 className='sortes-title'>Accounting</h3>
          <div className='date-box'>
            <div className='date-box__start'>
              <h3 className='date-box__title'>From</h3>
              <input
                className='input'
                type='date'
                name=''
                id=''
                value={dateStart}
                max={dateEnd}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className='date-box__end'>
              <h3 className='date-box__title'>To</h3>
              <input
                className='date__field_end input'
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
            <ul className='list-links'>
              <li>
                <NavLink
                  to='/sorts/expences'
                  className='list-links__item list-links__item_expences'
                >
                  <span>Expences</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/sorts/all'
                  className='list-links__item list-links__item_all'
                >
                  <span>All</span>
                </NavLink>

              </li>
              <li>
                <NavLink
                  to='/sorts/incomes'
                  className='list-links__item list-links__item_incomes'
                >
                  <span>Incomes</span>
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
                />
)}
            />
          </Routes>
        </div>
      </div>
    </section>
  );
};
