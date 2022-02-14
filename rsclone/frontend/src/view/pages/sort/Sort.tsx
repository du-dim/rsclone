import React, { useEffect } from 'react';
import {
  NavLink, Route, Routes, useNavigate,
} from 'react-router-dom';
import { All } from '../../components/sortdates/All';
import { ChooseDate } from '../../components/sortdates/ChooseDate';
import { Expences } from '../../components/sortdates/Expences';
import { Incomes } from '../../components/sortdates/Incomes';
import './sort.scss';

export const Sort = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/sorts/all');
  }, []);

  return (
    <section className='sortes'>
      <div className='container'>
        <div className='page-sortes-date'>
          <h3 className='sortes-title'>Accounting</h3>
          <ChooseDate />
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
            <Route path='expences' element={<Expences />} />
            <Route path='all' element={<All />} />
            <Route path='incomes' element={<Incomes />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};
