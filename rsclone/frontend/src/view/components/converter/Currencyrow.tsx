/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { ICurrent } from '../../pages/converter/Converter';

interface IProps {
  // name:string,
  dataCurrency: ICurrent[],
  // arrCurencyName: string[],
  // onChangeCurrency:React.ChangeEventHandler<HTMLSelectElement>,
  // onChangeAmount:React.ChangeEventHandler<HTMLInputElement>,
  // amount: number;
}
export const Currencyrow = ({ dataCurrency }:IProps) => {
//   name,
//   dataCurrencyAll, selectedCurrency,
//   onChangeCurrency, amount,
//   onChangeAmount,
// }:IProps,
// }
  return (
    <div className='currency-row'>
      <input className='currency-input' type='number' />
      <select className='currency-select'>
        {dataCurrency.map((el) => (
          <option className='currency-option' key={el.Cur_ID}>{el.Cur_Abbreviation}</option>
        ))}
      </select>
      <div className='name' />
    </div>
  );
};
