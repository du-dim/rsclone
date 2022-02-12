import React from 'react';

interface IProps {
  selectedCurrency: string,
  onChangeCurrency:React.ChangeEventHandler<HTMLSelectElement>,
  onChangeAmount:React.ChangeEventHandler<HTMLInputElement>,
  amount: number;
}

const BYN = 'BYN';
export const CUrrencyRowBYN = ({
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}:IProps) => {
  return (
    <div className='currency-row'>
      <input className='currency-input' type='number' value={amount} onChange={onChangeAmount} />
      <select className='currency-select' value={selectedCurrency} onChange={onChangeCurrency}>
        {/* {currencyOptions.map((option) => (
          <option value={option} key={currencyOptions.indexOf(option)} disabled='BYN'>{option}</option>
        ))} */}
        <option value='BYN' key={BYN}>{BYN}</option>
      </select>
    </div>
  );
};
