import React, { useState, useEffect } from 'react';
import './currency.scss';

type IProps = {
  setCurrency: React.Dispatch<React.SetStateAction<string>>,
}

export const Currency = ({ setCurrency }:IProps) => {
  const currencyType = {
    BYN: 'Белорусских рублей',
    USD: 'Доллар США',
    EUR: 'Евро',
    RUB: 'Российских рублей',
    UAH: 'Гривен',
    PLN: 'Злотых',
    GBP: 'Фунт стерлингов',
    CNY: 'Китайских юаней',
  };
  const arrCurrency = Object.entries(currencyType);
  const [option, setOption] = useState('BYN');
  const changeCurrency = (val: string) => {
    setOption(val);
    setCurrency(val);
  };

  useEffect(() => {
    if (localStorage.getItem('saveCurrency')) {
      const saveCurrency = localStorage.getItem('saveCurrency') as string;
      setOption(saveCurrency);
      setCurrency(saveCurrency);
    }
  }, []);

  return (
    <div className='currency'>
      <select
        className='currency-select'
        onChange={(e) => changeCurrency(e.currentTarget.value)}
        value={option}
      >
        {arrCurrency.map((el) => (
          <option className='currency-option' key={el[0]} value={el[0]}>{`${el[1]} ${el[0]}`}</option>
        ))}
      </select>
    </div>
  );
};
