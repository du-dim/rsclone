import React, { useEffect, useState } from 'react';
import Currencyrow from '../../components/converter/Currencyrow';
import { Liveconvert } from '../../components/converter/Liveconvert';
// import { Userconvert } from '../../components/converter/Userconvert';
import './converter.scss';

export interface ICurrentArray {
  data: Array<ICurrent>;
}
export interface ICurrent {
  Cur_Abbreviation: string,
  Cur_OfficialRate:number,
}

export const Converter:React.FC = () => {
  const BASE_URL = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });
  const arrCurrencyName:string[] = [];
  const arrCurrencyRates:ICurrent[] = [];
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  console.log(currencyOptions);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<string>();
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true);
  console.log(exchangeRate);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:Array<ICurrent>) => {
        data.forEach((el) => {
          arrCurrencyName.push(el.Cur_Abbreviation);
          const obj = {
            name: el.Cur_Abbreviation,
            amount: el.Cur_OfficialRate,
          };
          arrCurrencyRates.push(obj);
        });
        console.log(arrCurrencyRates);
        arrCurrencyName.unshift('BYN');
        const firstCurrency = Object.keys(arrCurrencyName)[1];
        // select option
        setCurrencyOptions(arrCurrencyName);
        setFromCurrency(firstCurrency);
        setToCurrency(arrCurrencyName[6]);
        console.log(data);
        // setExchangeRate(firstCurrency[6]);
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
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}

            />
            <div className='equals'>=</div>
            <Currencyrow
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
            />
          </div>
          <Liveconvert />
        </article>
      </div>
    </section>
  );
};
