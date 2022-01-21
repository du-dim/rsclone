import React from 'react';
import { Link } from 'react-router-dom';

export const Footernav = () => {
  return (
    <div className='footer-nav'>
      <div className='footer-nav-list'>
        <Link to='../sorts' className='footer-nav-list__item img-nav' />
        <Link to='../calculator' className='footer-nav-list__item img-nav' />
        <Link to='map' className='footer-nav-list__item img-nav' />
        <Link to='converter' className='footer-nav-list__item img-nav' />
        <Link to='schedule' className='footer-nav-list__item img-nav' />
      </div>
    </div>
  );
};
