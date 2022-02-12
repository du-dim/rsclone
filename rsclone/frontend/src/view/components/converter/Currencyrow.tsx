/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface IArrayConvert {
  currencyOptions: Array<string>
}

export default function Currencyrow({ currencyOptions }:IArrayConvert) {
  return (
    <div className='currency-row'>
      <input className='currency-input' type='number' />
      <select className='currency-select'>
        {currencyOptions.map((option) => (
          <option value={option} key={currencyOptions.indexOf(option)}>{option}</option>
        ))}
      </select>
    </div>
  );
}
