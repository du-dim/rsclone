import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = () => {
  return (
    <section className='footer'>
      <div className='footer__container'>
        <div className='footer__nav'>
          <Link to='sorts/total' className='footer__nav_item img-nav' />
          <Link to='calculator' className='footer__nav_item img-nav' />
          <Link to='home' className='footer__nav_item img-nav' />
          <Link to='converter' className='footer__nav_item img-nav' />
          <Link to='Statistics/total' className='footer__nav_item img-nav' />
        </div>
        {/* <div className='footer__info-project'>
          <InfoAuthors />
        </div> */}
      </div>
    </section>
  );
};
