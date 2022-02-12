/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import Currencyrow from '../../components/converter/Currencyrow';
import { CUrrencyRowBYN } from '../../components/converter/CUrrencyRowBYN';
// import { Userconvert } from '../../components/converter/Userconvert';
import './converter.scss';

const BASE_URL = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

const todayDate = new Date().toLocaleString('en-US', {
  day: '2-digit', weekday: 'short', month: 'long',
});

let COURSE = 1;

const bynObj = [{
  Cur_ID: 400,
  Date: '2022-02-12T00:00:00',
  Cur_Abbreviation: 'BYN',
  Cur_Scale: 1,
  Cur_Name: 'Беларусский рубль',
  Cur_OfficialRate: 1.0,
}];

export interface ICurrent {
  Cur_Abbreviation: string,
  Cur_OfficialRate: number,
  // Cur_ID: number,
  // Date:string,
  // Cur_Scale:number,
  // Cur_Name:string,
  }
interface IObjForGetCourse {
  Cur_Abbreviation: string,
  Cur_OfficialRate: number,
}

export const Converter:React.FC = () => {
  let prepareData:ICurrent[] = [];
  const arrCurrencyName:string[] = [];
  const arrCurrencyValue:number[] = [];
  const arrCurrencyRates:ICurrent[] = [];
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number>(1);
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
    fromAmount = Number(amount.toFixed(4));
    toAmount = Number(amount.toFixed(4)) * exchangeRate;
  } else {
    toAmount = Number(amount.toFixed(4));
    fromAmount = Number(amount.toFixed(4)) / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:ICurrent[]) => {
        prepareData = data.concat(bynObj);

        prepareData.forEach((el) => {
          const obj:IObjForGetCourse = {
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

        /* cyrrency on page */
        setCourseUSD(arrCurrencyRates[arrCurrencyName.indexOf('USD')].Cur_OfficialRate);
        setCourseRUB(arrCurrencyRates[arrCurrencyName.indexOf('RUB')].Cur_OfficialRate);
        setCourseEUR(arrCurrencyRates[arrCurrencyName.indexOf('EUR')].Cur_OfficialRate);
        setCourseUAH((arrCurrencyRates[arrCurrencyName.indexOf('UAH')].Cur_OfficialRate) / 10);
        setCoursePLN((arrCurrencyRates[arrCurrencyName.indexOf('PLN')].Cur_OfficialRate) / 10);
        /*-----------*/

        const firstCurrency = arrCurrencyName[arrCurrencyName.indexOf('USD')];
        setFromCurrency(firstCurrency);
        setToCurrency(arrCurrencyName[arrCurrencyName.indexOf('USD')]);
        setExchangeRate(arrCurrencyValue[arrCurrencyName.indexOf('USD')]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(BASE_URL)
        .then((res) => res.json())
        .then((data:ICurrent[]) => {
          prepareData = data.concat(bynObj);

          prepareData.forEach((currency) => {
            if (currency.Cur_Abbreviation === fromCurrency) {
              COURSE = currency.Cur_OfficialRate;
            }
            setExchangeRate(COURSE);
          });
        });
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setAmount(Number(e.currentTarget.value));
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setAmount(Number(e.currentTarget.value));
    setAmountInFromCurrency(false);
  };
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
              {/* <Currencyrow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={(e) => setToCurrency(e.target.value)}
                amount={toAmount}
                onChangeAmount={handleToAmountChange}
              /> */}
              <CUrrencyRowBYN
                onChangeCurrency={(e) => setToCurrency(e.target.value)}
                selectedCurrency={toCurrency}
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
