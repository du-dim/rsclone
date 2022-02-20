import React, { useEffect, useState } from 'react';
import { ICurrent } from '../../../types/types';
import './currencies.scss';

export const Currencies = () => {
  const bynObj = {
    Cur_ID: 400,
    Date: '2022-02-12T00:00:00',
    Cur_Abbreviation: 'BYN',
    Cur_Scale: 1,
    Cur_Name: 'Беларусский рубль',
    Cur_OfficialRate: 1.0,
  };
  const arrCurrency = ['USD', 'EUR', 'RUB', 'UAH', 'PLN', 'GBP', 'CNY'];
  const [dataCurrency, setDataCurrency] = useState<ICurrent[]>([bynObj]);
  const [classActiv, setClassActiv] = useState([true]);

  const storageCurrency = (name: string) => {
    localStorage.setItem('saveCurrency', name);
    setClassActiv(dataCurrency.map((e) => (e.Cur_Abbreviation === name)));
  };

  useEffect(() => {
    const dataStorege = sessionStorage.getItem('dataCurrency');
    if (dataStorege) {
      const datafilter = JSON.parse(dataStorege).filter((obj:ICurrent) => arrCurrency.includes(obj.Cur_Abbreviation));
      setDataCurrency([bynObj, ...datafilter]);
      if (localStorage.getItem('saveCurrency')) {
        const save = localStorage.getItem('saveCurrency');
        setClassActiv([bynObj, ...datafilter].map((e) => (e.Cur_Abbreviation === save)));
      }
    }
  }, []);

  return (
    <section className='currencies-page'>
      <h4 className='currencies-page__title'>Currency</h4>
      <h5 className='instruction-title'>Select default curency</h5>
      <div className='nav-currency'>
        <div className='list-currency'>
          {dataCurrency.map((val, index) => (
            <div
              className={classActiv[index] ? 'item-currency active' : 'item-currency'}
              onClick={() => storageCurrency(val.Cur_Abbreviation)}
              key={val.Cur_ID}
            >
              <div className='item-currency__allname'>{val.Cur_Name}</div>
              <div className='item-currency__abbrev'>{val.Cur_Abbreviation}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
