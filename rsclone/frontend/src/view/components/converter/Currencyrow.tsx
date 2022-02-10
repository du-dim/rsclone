/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

export default function Currencyrow() {
  return (
    <div className='currency-row'>
      <input className='currency-input' type='number' />
      <select className='currency-select' name=''>
        <option value='1'>1</option>
      </select>
    </div>
  );
}
