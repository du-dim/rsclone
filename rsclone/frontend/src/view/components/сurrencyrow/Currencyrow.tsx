/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { ICurrent } from '../../../types/types';

interface IProps {
  dataCurrency: ICurrent[],
  setCurrency: React.Dispatch<React.SetStateAction<string>>,
}
export const Currencyrow = ({ dataCurrency, setCurrency } :IProps) => {
  const changeCurrency = (val: string) => {
    setCurrency(val);
  };

  return (
    <select className='currency-select' onChange={(e) => changeCurrency(e.target.value)}>
      {dataCurrency.map((el) => (
        <option className='currency-option' key={el.Cur_ID} value={el.Cur_Abbreviation}>{el.Cur_Abbreviation}</option>
      ))}
    </select>
  );
};
