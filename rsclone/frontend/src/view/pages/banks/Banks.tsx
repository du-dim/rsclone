/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import './banks.scss';

export const Banks = () => {
  const banks = ['AlfaBank', 'Belagroprombank', 'Belarusbank', 'Belgazprombank', 'Belinvestbank', 'Priorbank', 'MTBank', 'SberBank'];
  const banksType = ['Bank branch', 'ATM', 'Infokiosk'];
  const [check, setCheck] = useState([true, true, true]);
  const [classActiv, setClassActiv] = useState(banks.map((e) => true));

  const changeBank = (num: number) => {
    setClassActiv(classActiv.map((e, i) => (i === num ? !e : e)));
  };

  const changeType = (num: number) => {
    setCheck(check.map((e, i) => (i === num ? !e : e)));
  };

  return (
    <div className='page-banks'>
      <h3>Bank settings</h3>
      <div className='page-banks__type'>
        {banksType.map((el, index) => (
          <div
            className={check[index] ? 'page-banks__type_item active' : 'page-banks__type_item'}
            key={`${el}`}
            onClick={() => changeType(index)}
          >
            {el}
          </div>
        ))}
      </div>
      <div className='banks'>
        <div className='banks__title'>Name of banks</div>
        {banks.map((el, index) => (
          <div
            className={classActiv[index] ? 'banks__item active' : 'banks__item'}
            key={`bank${el}`}
            onClick={() => changeBank(index)}
          >
            <img className='banks__item_img' src={`assets/icons/banks/${el}.svg`} alt='' />
            <p className='banks__item_text'>{el}</p>
          </div>
        ))}
      </div>

    </div>
  );
};
