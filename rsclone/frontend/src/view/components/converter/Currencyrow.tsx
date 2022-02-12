/* eslint-disable jsx-a11y/control-has-associated-label */
import { type } from 'os';
import React from 'react';

interface IProps {
  currencyOptions: Array<string>,
  selectedCurrency: string;
  onChangeCurrency:React.ChangeEventHandler<HTMLSelectElement>;
}
export default function Currencyrow(
  { currencyOptions, selectedCurrency, onChangeCurrency }:IProps,
) {
  return (
    <div className='currency-row'>
      <input className='currency-input' type='number' />
      <select className='currency-select' value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option value={option} key={currencyOptions.indexOf(option)}>{option}</option>
        ))}
      </select>
    </div>
  );
}
