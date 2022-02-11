import React, { useEffect, useState } from 'react';
import { Liveconvert } from '../../components/converter/Liveconvert';
import { Userconvert } from '../../components/converter/Userconvert';
import './converter.scss';

export interface ICurrentArray {
  data: Array<ICurrent>;
}
export interface ICurrent {
  Cur_ID:number,
  Cur_Abbreviation: string,
  Cur_OfficialRate:number,
}
const arrCurrencyName:string[] = [];
export const Converter = () => {
  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });

  const [currencyOptions, setCurrencyOptions] = useState([]);

  const BASE_URL = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:Array<ICurrent>) => {
        console.log(data);
        setCurrencyOptions([arrCurrencyName]);
        // data.forEach((el) => {
        //   setCurrencyOptions([arrCurrencyName, ...Object.keys(el.Cur_Abbreviation)];
        //   return arrCurrencyName;
        // });
        console.log(arrCurrencyName);
      });
  }, []);

  // useEffect(() => {

  // });
  return (
    <section className='converter'>
      <div className='container'>
        <article className='converter-content'>
          <h3 className='date'>{todayDate}</h3>
          <Userconvert />
          <Liveconvert />
        </article>
      </div>
    </section>
  );
};
