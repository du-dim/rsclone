/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-underscore-dangle
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { IBody } from '../../../types/types';
import { Navlink } from '../../components/navlink/Navlink';
import { All } from '../../components/sortdates/All';
import { Expences } from '../../components/sortdates/Expences';
import { Incomes } from '../../components/sortdates/Incomes';
import { DateRange } from '../../components/date/DateRange';
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
    navigate('/sorts/total');
  }, []);

  const [valueSearch, setValueSearch] = useState<string>('');

  return (
    <div className='sortes'>
      <h2>Accounting</h2>
      <input
        className='info-box__search'
        type='search'
        placeholder='Search'
        onChange={(event) => setValueSearch(event.target.value)}
      />
      <DateRange
        dateStart={dateStart}
        dateEnd={dateEnd}
        setDateStart={setDateStart}
        setDateEnd={setDateEnd}
        today={today}
      />
      <Navlink linkNav='/Sorts' />
      <Routes>
        <Route
          path='/expense'
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
          path='/total'
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
          path='/income'
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
  );
};
