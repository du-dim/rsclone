/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

interface IProps {
  name:string,
  currencyOptions: string[],
  selectedCurrency: string,
  onChangeCurrency:React.ChangeEventHandler<HTMLSelectElement>,
  onChangeAmount:React.ChangeEventHandler<HTMLInputElement>,
  amount: number;
}
export default function Currencyrow(
  {
    name,
    currencyOptions, selectedCurrency,
    onChangeCurrency, amount,
    onChangeAmount,
  }:IProps,
) {
  return (
    <div className='currency-row'>
      <input className='currency-input' type='number' value={amount} onChange={onChangeAmount} />
      <select className='currency-select' value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option value={option} key={option}>{option}</option>
        ))}
      </select>
      <div className='name'>{name}</div>
    </div>
  );
}
