/* eslint-disable dot-notation */
import React, { EventHandler, useEffect, useState } from 'react';
import Currencyrow from '../../components/converter/Currencyrow';
import { Liveconvert } from '../../components/converter/Liveconvert';
// import { Userconvert } from '../../components/converter/Userconvert';
import './converter.scss';

export interface ICurrent {
  Cur_Abbreviation: string,
  Cur_OfficialRate: number,
  // Cur_ID: number,
  // Date:string,
  // Cur_Scale:number,
  // Cur_Name:string,
   }
let usdCourse:number;
export const Converter:React.FC = () => {
  const BASE_URL = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });

  let prepareData:ICurrent[] = [];
  const arrCurrencyName:string[] = [];
  const arrCurrencyValue:number[] = [];
  const arrCurrencyRates:ICurrent[] = [];
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>();
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true);

  const [courseUSD, setCourseUSD] = useState<number>();
  const [courseEUR, setCourseEUR] = useState<number>();
  const [courseRUS, setCourseRUB] = useState<number>();
  const [courseUAH, setCourseUAH] = useState<number>();
  const [coursePLN, setCoursePLN] = useState<number>();

  let toAmount:number;
  let fromAmount:number;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:ICurrent[]) => {
        prepareData = data.concat([{
          // Cur_ID: 400,
          // Date: '2022-02-12T00:00:00',
          Cur_Abbreviation: 'BYN',
          // Cur_Scale: 1,
          // Cur_Name: 'Беларусский рубль',
          Cur_OfficialRate: 1.0,
        }]);
        prepareData.forEach((el) => {
          const obj:ICurrent = {
            Cur_Abbreviation: el.Cur_Abbreviation,
            Cur_OfficialRate: el.Cur_OfficialRate,
          };
          arrCurrencyRates.push(obj);
          return arrCurrencyRates;
        });
        arrCurrencyRates.forEach((element) => {
          arrCurrencyName.push(element.Cur_Abbreviation);
          arrCurrencyValue.push(element.Cur_OfficialRate);
        });
        setCurrencyOptions(arrCurrencyName);

        const indexBYN = arrCurrencyName.indexOf('BYN');
        const indexUSD = arrCurrencyName.indexOf('USD');
        const indexEUR = arrCurrencyName.indexOf('EUR');
        const indexRUS = arrCurrencyName.indexOf('RUS');
        setCourseUSD(arrCurrencyRates[arrCurrencyName.indexOf('USD')].Cur_OfficialRate);
        setCourseRUB(arrCurrencyRates[arrCurrencyName.indexOf('RUB')].Cur_OfficialRate);
        setCourseEUR(arrCurrencyRates[arrCurrencyName.indexOf('EUR')].Cur_OfficialRate);
        setCourseUAH((arrCurrencyRates[arrCurrencyName.indexOf('UAH')].Cur_OfficialRate) / 10);
        setCoursePLN((arrCurrencyRates[arrCurrencyName.indexOf('PLN')].Cur_OfficialRate) / 10);

        const firstCurrency = arrCurrencyName[indexUSD];
        setFromCurrency(firstCurrency);
        setToCurrency(arrCurrencyName[arrCurrencyName.indexOf('BYN')]);
        setExchangeRate(arrCurrencyValue[indexUSD]);
      });
  }, []);

  const handleFromAmountChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAmount(e.target);
    setAmountInFromCurrency(true);
  };

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <section className='converter'>
      <div className='container'>
        <article className='converter-content'>
          <h2 className='date'>{todayDate}</h2>
          <div className='user-convert'>
            <h2 className='user-convert__title'>Converter</h2>
            <div className='user-convert__box'>
              <Currencyrow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                amount={fromAmount}
                onChangeAmount={handleFromAmountChange}
              />
              <div className='equals'>=</div>
              <Currencyrow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={(e) => setToCurrency(e.target.value)}
                amount={toAmount}
                onChangeAmount={handleToAmountChange}
              />
            </div>
          </div>
          <div className='live-convert'>
            <h2 className='live-convert__title'>Live Exchange Rates</h2>
            <h3 className='live-convert__title'>(BYN)</h3>
            <ul className='list-curriency'>
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
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
};
