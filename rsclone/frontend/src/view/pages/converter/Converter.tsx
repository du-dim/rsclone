/* eslint-disable max-len */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import { Currencyrow } from '../../components/сurrencyrow/Currencyrow';
import { Today } from '../../components/data/Today';
import { InputConverter } from '../../components/inputConverter/InputConverter';
import { Rate } from '../../components/rate/Rate';
import './converter.scss';

const BASE_URL = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

const bynObj = {
  Cur_ID: 400,
  Date: '2022-02-12T00:00:00',
  Cur_Abbreviation: 'BYN',
  Cur_Scale: 1,
  Cur_Name: 'Беларусский рубль',
  Cur_OfficialRate: 1.0,
};

export interface ICurrent {
  Cur_Abbreviation: string,
  Cur_OfficialRate: number,
  Cur_ID: number,
  Date:string,
  Cur_Scale:number,
  Cur_Name:string,
  }

export const Converter = () => {
  const arrCurrency = ['USD', 'EUR', 'RUB', 'UAH', 'PLN'];
  const [arrRate, setRate] = useState<number[]>([]);
  const [dataCurrency, setDataCurrency] = useState<ICurrent[]>([bynObj]);
  const [currencyFirst, setCurrencyFirst] = useState('BYN');
  const [currencySecond, setCurrencySecond] = useState('BYN');
  const [amountFirst, setAmountFirst] = useState(1);
  const [amountSecond, setAmountSecond] = useState(1);
  const [focusFirst, setFocusFirst] = useState(false);
  const [focusSecond, setFocusSecond] = useState(false);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:ICurrent[]) => {
        const dataIntro = [bynObj, ...data];
        setDataCurrency(dataIntro);
        const rates = arrCurrency.map((el) => data.find((obj) => obj.Cur_Abbreviation === el)) as ICurrent[];
        setRate(rates.map((obj) => Math.round((obj.Cur_OfficialRate * 10000) / obj.Cur_Scale) / 10000));
      });
  }, []);

  useEffect(() => {
    if (!focusFirst && focusSecond) {
      const dataFirst = dataCurrency.filter((obj) => obj.Cur_Abbreviation === currencyFirst)[0];
      const dataSecond = dataCurrency.filter((obj) => obj.Cur_Abbreviation === currencySecond)[0];
      setAmountFirst(Math.round((amountSecond * dataSecond.Cur_OfficialRate * dataFirst.Cur_Scale * 10000) / (dataFirst.Cur_OfficialRate * dataSecond.Cur_Scale)) / 10000);
    }
  }, [amountSecond]);

  useEffect(() => {
    if (!focusSecond && focusFirst) {
      const dataFirst = dataCurrency.filter((obj) => obj.Cur_Abbreviation === currencyFirst)[0];
      const dataSecond = dataCurrency.filter((obj) => obj.Cur_Abbreviation === currencySecond)[0];
      setAmountSecond(Math.round((amountFirst * dataFirst.Cur_OfficialRate * dataSecond.Cur_Scale * 10000) / (dataSecond.Cur_OfficialRate * dataFirst.Cur_Scale)) / 10000);
    }
  }, [amountFirst]);

  useEffect(() => {
    const dataFirst = dataCurrency.filter((obj) => obj.Cur_Abbreviation === currencyFirst)[0];
    const dataSecond = dataCurrency.filter((obj) => obj.Cur_Abbreviation === currencySecond)[0];
    setAmountSecond(Math.round((amountFirst * dataFirst.Cur_OfficialRate * dataSecond.Cur_Scale * 10000) / (dataSecond.Cur_OfficialRate * dataFirst.Cur_Scale)) / 10000);
  }, [currencySecond]);

  useEffect(() => {
    const dataFirst = dataCurrency.filter((obj) => obj.Cur_Abbreviation === currencyFirst)[0];
    const dataSecond = dataCurrency.filter((obj) => obj.Cur_Abbreviation === currencySecond)[0];
    setAmountFirst(Math.round((amountSecond * dataSecond.Cur_OfficialRate * dataFirst.Cur_Scale * 10000) / (dataFirst.Cur_OfficialRate * dataSecond.Cur_Scale)) / 10000);
  }, [currencyFirst]);

  return (
    <section className='converter-page'>
      <Today />
      <div className='user-convert'>
        <h2 className='user-convert__title'>Converter</h2>
        <div className='user-convert__box'>
          <div className='currency-row'>
            <InputConverter
              amount={amountFirst}
              setAmount={setAmountFirst}
              setFocus={setFocusFirst}
            />
            <Currencyrow
              dataCurrency={dataCurrency}
              setCurrency={setCurrencyFirst}
            />
          </div>
          <div className='equals'>=</div>
          <div className='currency-row'>
            <InputConverter
              amount={amountSecond}
              setAmount={setAmountSecond}
              setFocus={setFocusSecond}
            />
            <Currencyrow
              dataCurrency={dataCurrency}
              setCurrency={setCurrencySecond}
            />
          </div>
        </div>
      </div>
      <div className='live-convert'>
        <h2 className='live-convert__title'>Live Exchange Rates</h2>
        <h3 className='live-convert__title'>(BYN)</h3>
        <div className='list-curriency'>
          {arrCurrency.map((el, i) => <Rate name={el} value={arrRate[i]} key={el} />)}
        </div>
      </div>
    </section>
  );
};
