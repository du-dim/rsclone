/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import { Currencyrow } from '../../components/converter/Currencyrow';
import { Today } from '../../components/data/Today';
// import { Userconvert } from '../../components/converter/Userconvert';
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
  const [dataCurrency, setDataCurrency] = useState<ICurrent[]>([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:ICurrent[]) => {
        setDataCurrency([...[bynObj], ...data]);
      });
  }, []);

  console.log(dataCurrency);
  // const dataCurrencyAll:ICurrent[] = [...dataCurrency];
  // dataCurrencyAll.unshift(bynObj);

  // const [fromCurrency, setFromCurrency] = useState<string>('');
  // const [toCurrency, setToCurrency] = useState<string>('');
  // const objUSD = dataCurrencyAll.filter((el) => el.Cur_Abbreviation === 'USD');

  // const USD = objUSD.map((el) => el.Cur_Abbreviation);
  // console.log(USD[0]);

  // const arrCurrencyValue:number[] = [];
  // const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  // const [exchangeRate, setExchangeRate] = useState<number>(1);
  // const [amount, setAmount] = useState<number>(1);
  // const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true);
  // const [nameCurrency, setnameCurrency] = useState<string>('');

  // const [courseUSD, setCourseUSD] = useState<number>();
  // const [courseEUR, setCourseEUR] = useState<number>();
  // const [courseRUS, setCourseRUB] = useState<number>();
  // const [courseUAH, setCourseUAH] = useState<number>();
  // const [coursePLN, setCoursePLN] = useState<number>();

  // let toAmount:number;
  // let fromAmount:number;
  // if (amountInFromCurrency) {
  //   fromAmount = +amount.toFixed(4);
  //   toAmount = +amount.toFixed(4) * exchangeRate;
  // } else {
  //   toAmount = +amount.toFixed(4);
  //   fromAmount = +amount.toFixed(4) / exchangeRate;
  // }

  /* cyrrency on page */

  // setCourseUSD(+((prepareData[arrCurrencyName.indexOf('USD')].Cur_OfficialRate)).toFixed(4));
  // setCourseRUB(+((prepareData[arrCurrencyName.indexOf('RUB')].Cur_OfficialRate) / 100).toFixed(4));
  // setCourseEUR(+((prepareData[arrCurrencyName.indexOf('EUR')].Cur_OfficialRate)).toFixed(4));
  // setCourseUAH(+((prepareData[arrCurrencyName.indexOf('UAH')].Cur_OfficialRate) / 10).toFixed(4));
  // setCoursePLN(+((prepareData[arrCurrencyName.indexOf('PLN')].Cur_OfficialRate) / 10).toFixed(4));

  /*-----------*/

  return (
    <section className='converter-page'>
      <div className='container'>
        <article className='converter-content'>
          <Today />
          <div className='user-convert'>
            <h2 className='user-convert__title'>Converter</h2>
            <div className='user-convert__box'>
              <Currencyrow
                dataCurrency={dataCurrency}
              />
              <div className='equals'>=</div>
              <Currencyrow
                dataCurrency={dataCurrency}
              />
            </div>
          </div>
          <div className='live-convert'>
            <h2 className='live-convert__title'>Live Exchange Rates</h2>
            <h3 className='live-convert__title'>(BYN)</h3>
            {/* <ul className='list-curriency'>
              <li className='item-curriency'>
                <h3 className='symbol'>USD</h3>
                <div className='value'>{courseUSD}</div>
              </li>
              <li className='item-curriency'>
                <h3 className='symbol'>EUR</h3>
                <div className='value'>{courseEUR}</div>
              </li>
              <li className='item-curriency'>
                <h3 className='symbol'>RUB</h3>
                <div className='value'>{courseRUS}</div>
              </li>
              <li className='item-curriency'>
                <h3 className='symbol'>UAH</h3>
                <div className='value'>{courseUAH}</div>
              </li>
              <li className='item-curriency'>
                <h3 className='symbol'>PLN</h3>
                <div className='value'>{coursePLN}</div>
              </li>
            </ul> */}
          </div>
        </article>
      </div>
    </section>
  );
};
