import React from 'react';
import { Today } from '../../components/data/Today';
import { ICurrent } from '../converter/Converter';
import './currencies.scss';

type IProps= {
  dataCurrency: ICurrent[],
}

export const Currencies = ({ dataCurrency }:IProps) => {
  const bynObj = {
    Cur_ID: 400,
    Date: '2022-02-12T00:00:00',
    Cur_Abbreviation: 'BYN',
    Cur_Scale: 1,
    Cur_Name: 'Беларусский рубль',
    Cur_OfficialRate: 1.0,
  };
  const dataCurrencyAll:ICurrent[] = [...dataCurrency];
  dataCurrencyAll.unshift(bynObj);
  console.log(dataCurrencyAll[dataCurrencyAll.length - 1]);
  return (
    <section className='currencies-page'>
      <div className='container'>
        <article className='currencies-content'>
          <Today />
          <h4 className='currencies-content__title'>Currency</h4>
          <h5 className='instruction-title'>Select default curency</h5>
          {/* <p>
            The currency symbol for all transactions will be changed
            from BYN to USD. Howevew, transactions amounts will
            not be converted based on the exchznge rate.

          </p> */}
          <nav className='nav-currency'>
            <div className='list-currency'>
              {dataCurrencyAll.map((val) => (
                <ul className='item-currency'>
                  <li className='item-currency__allname'>{val.Cur_Name}</li>
                  <li className='item-currency__abbrev'>{val.Cur_Abbreviation}</li>
                </ul>
              ))}
              ;

            </div>
          </nav>
        </article>
      </div>
    </section>
  );
};
