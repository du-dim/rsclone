import React from 'react';
import { NavLink } from 'react-router-dom';
import './navlink.scss';

type IProps = {
  linkNav: string,
}

export const Navlink = ({ linkNav }: IProps) => {
  return (
    <nav className='chart-link'>
      <NavLink to={`${linkNav}/expense`} className='nav-link'><span>Expense</span></NavLink>
      <NavLink to={`${linkNav}/total`} className='nav-link'><span>Total</span></NavLink>
      <NavLink to={`${linkNav}/income`} className='nav-link'><span>Income</span></NavLink>
    </nav>
  );
};
