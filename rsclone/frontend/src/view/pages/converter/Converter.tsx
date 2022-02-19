/* eslint-disable no-unsafe-optional-chaining */
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
  const [fromCurrency, setFromCurrency] = useState<string>(''); // BYN default in option from
  const [toCurrency, setToCurrency] = useState<string>(''); // USD default in option to
  const [exchangeRate, setExchangeRate] = useState<number>(1); // course USD
  const [amount, setAmount] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const [courseUSD, setCourseUSD] = useState<number>();
  const [courseEUR, setCourseEUR] = useState<number>();
  const [courseRUS, setCourseRUB] = useState<number>();
  const [courseUAH, setCourseUAH] = useState<number>();
  const [coursePLN, setCoursePLN] = useState<number>();

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:ICurrent[]) => {
        const dataIntro = [...data, ...[bynObj]];
        setDataCurrency(dataIntro);

        const firstValueCurrency = dataIntro[dataIntro.length - 1].Cur_Abbreviation;
        setFromCurrency(dataIntro[5].Cur_Abbreviation);// from usd default
        setToCurrency(firstValueCurrency); // to byn default
        setExchangeRate(dataIntro[5].Cur_OfficialRate);

        setCourseUSD(+((dataIntro[5].Cur_OfficialRate) / dataIntro[5].Cur_Scale).toFixed(4));
        setCourseRUB(+((dataIntro[17].Cur_OfficialRate) / dataIntro[17].Cur_Scale).toFixed(4));
        setCourseEUR(+((dataIntro[6].Cur_OfficialRate) / dataIntro[6].Cur_Scale).toFixed(4));
        setCourseUAH(+((dataIntro[3].Cur_OfficialRate) / dataIntro[3].Cur_Scale).toFixed(4));
        setCoursePLN(+((dataIntro[7].Cur_OfficialRate) / dataIntro[7].Cur_Scale).toFixed(4));
      });
  }, []);

  const handleFromAmountChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setAmount(Number(e.currentTarget.value));
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setAmount(Number(e.currentTarget.value));
    setAmountInFromCurrency(false);
  };

  let toAmount:number;
  let fromAmount:number;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  console.log(fromCurrency, fromAmount, exchangeRate, toCurrency, toAmount, amountInFromCurrency);
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(BASE_URL)
        .then((res) => res.json())
        .then((data:ICurrent[]) => {
          const dataValue:ICurrent[] = [...data, ...[bynObj]];
          // setExchangeRate(???????????????????????); //??????????????
        });
    }
  }, [fromCurrency, toCurrency]);

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
                selectedCurrency={fromCurrency}
                onChangeCurrency={(e) => (setFromCurrency(e.target.value))}
                amount={fromAmount}
                onChangeAmount={handleFromAmountChange}
              />
              <div className='equals'>=</div>
              <Currencyrow
                dataCurrency={dataCurrency}
                selectedCurrency={toCurrency}
                onChangeCurrency={(e) => (setToCurrency(e.target.value))}
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
