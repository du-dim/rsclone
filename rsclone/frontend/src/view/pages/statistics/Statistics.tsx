/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Routes, Route, NavLink, useNavigate,
} from 'react-router-dom';
import { CanvasExpense } from '../../components/canvasExpense/CanvasExpense';
import { CanvasIncome } from '../../components/canvasIncome/CanvasIncome';
import { CanvasTotal } from '../../components/canvasTotal/CanvasTotal';
import { IBody } from '../../../types/types';
import './statistics.scss';

type IProps = {
  dataChart: IBody[],
}

export const Statistics = ({ dataChart }: IProps) => {
  const time = new Date().getTime() + 3 * 60 * 60 * 1000;
  const today = new Date(time).toISOString().split('T')[0];
  const [dateStart, setDateStart] = useState(new Date(time - 604800000).toISOString().split('T')[0]);
  const [dateEnd, setDateEnd] = useState(today);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/Statistics/expense');
  }, []);

  return (
    <div className='page-statistics'>
      <h2>Statistics</h2>
      <div className='date'>
        <div className='date__field'>
          <div className='date__field_start'>
            <div className='date__field_end title'>Start date</div>
            <input
              className='date__field_start input'
              type='date'
              name=''
              id=''
              value={dateStart}
              max={dateEnd}
              onChange={(e) => setDateStart(e.target.value)}
            />
          </div>
          <div className='date__field_end'>
            <div className='date__field_end title'>End date</div>
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
      </div>
      <nav className='chart-link'>
        <NavLink to='/Statistics/expense' className='nav-link'><span>Expense</span></NavLink>
        <NavLink to='/Statistics/total' className='nav-link'><span>Total</span></NavLink>
        <NavLink to='/Statistics/income' className='nav-link'><span>Income</span></NavLink>
      </nav>
      <Routes>
        <Route
          path='/expense'
          element={(
            <CanvasExpense
              dataChart={dataChart}
              dateStart={dateStart}
              dateEnd={dateEnd}
            />
)}
        />
        <Route
          path='income'
          element={(
            <CanvasIncome
              dataChart={dataChart}
              dateStart={dateStart}
              dateEnd={dateEnd}
            />
)}
        />
        <Route
          path='total'
          element={(
            <CanvasTotal
              dataChart={dataChart}
              dateStart={dateStart}
              dateEnd={dateEnd}
            />
)}
        />
      </Routes>
    </div>
  );
};
