import React from 'react';
import Currencyrow from './Currencyrow';

export const Userconvert = () => {
  return (
    <div className='user-convert'>
      <h3>Converter</h3>
      <Currencyrow />
      <div className='equals'>=</div>
      <Currencyrow />
    </div>
  );
};
