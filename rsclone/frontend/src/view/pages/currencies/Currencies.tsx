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
          <h5 className='instruction-title'>Select default curency</h5>
          <p>
            The currency symbol for all transactions will be changed
            from BYN to USD. Howevew, transactions amounts will
            not be converted based on the exchznge rate.

          </p>
        </article>
      </div>
    </section>
  );
};
