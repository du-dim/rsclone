import React from 'react';
import { Bonus } from '../components/Bonus';
import './header.scss';

export const Header = () => {
  return (
    <section className='header'>
      <div className='container'>
        <div className='header-content'>
          <h1 className='h1'>wisely</h1>
          <div className='header-logo' />
          <Bonus />
          <nav className='header-nav' />
        </div>
      </div>
    </section>
  );
};
