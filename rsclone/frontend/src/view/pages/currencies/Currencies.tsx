import React from 'react';
import { Today } from '../../components/data/Today';
import './currencies.scss';

export const Currencies = () => {
  return (
    <section className='currencies-page'>
      <div className='container'>
        <article className='currencies-content'>
          <Today />
          <h4 className='currencies-content__title'>Currencies</h4>
          <h5 className='instruction-title'>You should to choose view of currencies</h5>
        </article>
      </div>
    </section>
  );
};
