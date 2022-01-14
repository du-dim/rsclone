import React from 'react';
import { Footernav } from '../components/Footernav';
import './footer.scss';

export const Footer = () => {
  return (
    <section className='footer'>
      <div className='container'>
        <Footernav />
      </div>
    </section>
  );
};
