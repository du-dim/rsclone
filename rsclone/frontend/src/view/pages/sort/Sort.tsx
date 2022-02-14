import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { SortDates } from '../../components/sortdates/SortDates';
import './sort.scss';

export const Sort = () => {
  return (
    <section className='sortes'>
      <div className='container'>
        <h3 className='sortes-title'>Sort</h3>
        <nav className='chart-link'>
          <NavLink to='/sorts/dates' className='nav-link'><span>Date</span></NavLink>
          <NavLink to='/sorts/categoties-expense' className='nav-link'><span>Expense</span></NavLink>
          <NavLink to='/sorts/categoties-income' className='nav-link'><span>Income</span></NavLink>
        </nav>
        <Routes>
          <Route path='/dates' element={<SortDates />} />
          <Route path='categoties-expense' element={2} />
          <Route path='categoties-income' element={3} />
        </Routes>
      </div>
    </section>
  );
};
