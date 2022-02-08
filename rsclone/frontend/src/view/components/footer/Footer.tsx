import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = () => {
  return (
    <section className='footer'>
      <div className='footer__nav'>
        <Link to='sorts' className='footer__nav_item img-nav' />
        <Link to='calculator' className='footer__nav_item img-nav' />
        <Link to='map' className='footer__nav_item img-nav' />
        <Link to='converter' className='footer__nav_item img-nav' />
        <Link to='schedule' className='footer__nav_item img-nav' />
      </div>
    </section>
  );
};
