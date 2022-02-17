import React from 'react';
import './currency.scss';

export const Currency = () => {
  const currencytype = '$';
  return (
    <div className='currency'>
      <span className='currency-type'>{currencytype}</span>
      <span className='currency-img' />
    </div>
  );
};
