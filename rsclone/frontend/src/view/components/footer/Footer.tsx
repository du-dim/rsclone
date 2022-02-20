import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';
import { InfoAuthors } from './InfoAuthors';

export const Footer = () => {
  return (
    <section className='footer'>
      <div className='footer__container'>
        <div className='footer__nav'>
          <Link to='sorts' className='footer__nav_item img-nav' />
          <Link to='calculator' className='footer__nav_item img-nav' />
          <Link to='map' className='footer__nav_item img-nav' />
          <Link to='converter' className='footer__nav_item img-nav' />
          <Link to='Statistics/expense' className='footer__nav_item img-nav' />
        </div>
        <div className='footer__info-project'>
          <InfoAuthors />
        </div>
      </div>
    </section>
  );
};
