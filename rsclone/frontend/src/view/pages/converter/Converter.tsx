import React, { useEffect, useState } from 'react';
import Currencyrow from '../../components/converter/Currencyrow';
import { Liveconvert } from '../../components/converter/Liveconvert';
// import { Userconvert } from '../../components/converter/Userconvert';
import './converter.scss';

export interface ICurrentArray {
  data: Array<ICurrent>;
}
export interface ICurrent {
  Cur_ID:number,
  Cur_Abbreviation: string,
  Cur_OfficialRate:number,
}

export const Converter:React.FC = () => {
  const arrCurrencyName:string[] = [];

  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });

  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  console.log(currencyOptions);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();
  const BASE_URL = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:Array<ICurrent>) => {
        data.forEach((el) => {
          arrCurrencyName.push(el.Cur_Abbreviation);
        });
        arrCurrencyName.unshift('BYN');
        const firstCurrency = Object.keys(arrCurrencyName)[arrCurrencyName.length - 1];
        setCurrencyOptions(arrCurrencyName);
        setFromCurrency(arrCurrencyName[arrCurrencyName.length - 1]);
        setToCurrency(firstCurrency);
      });
  }, []);
  return (
    <section className='converter'>
      <div className='container'>
        <article className='converter-content'>
          <h3 className='date'>{todayDate}</h3>
          <div className='user-convert'>
            <h3>Converter</h3>
            <Currencyrow
              currencyOptions={currencyOptions}
            />
            <div className='equals'>=</div>
            <Currencyrow
              currencyOptions={currencyOptions}
            />
          </div>
          <Liveconvert />
        </article>
      </div>
    </section>
  );
};
