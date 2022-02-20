/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calc } from '../../components/calc/Calc';
import { Note } from '../../components/note/Note';
import { Result } from '../../components/result/Result';
import { File } from '../../components/file/File';
import { Currency } from '../../components/currency/Currency';
import { IBody, ICurrent } from '../../../types/types';
import { bynObj } from '../../../data/const';
import './subBalans.scss';

export interface IDATE {
  year: string,
  month: string,
  day: string
}
export interface ICurrentRate {
  [key: string] : number
}

type IProps = {
  name: string,
  setData: React.Dispatch<React.SetStateAction<IBody[]>>,
}

export const SubBalans = ({ name, setData }:IProps) => {
  const arrCurrency = ['USD', 'EUR', 'RUB', 'UAH', 'PLN', 'GBP', 'CNY'];
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('BYN');
  const [noteValue, setNoteValue] = useState('');
  const [objRate, setObjRate] = useState<ICurrentRate[]>([]);
  const linkCategory = '../subCategories';
  const linkIcon = 'assets/icons/';
  const time = new Date().getTime() + 3 * 60 * 60 * 1000;
  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });
  const form = {
    amount: 0, currency, date: new Date(time).toISOString(), category: '-', note: '', user_id: '-', USD: 0, EUR: 0, RUB: 0, UAH: 0, PLN: 0, GBP: 0, CNY: 0,
  };

  useEffect(() => {
    const amountLocal = localStorage.getItem('amount') ? localStorage.getItem('amount') as string : '';
    const noteLocal = localStorage.getItem('note') ? localStorage.getItem('note') as string : '';
    const dataStorage = sessionStorage.getItem('dataCurrency');
    const dataCurrency = dataStorage ? JSON.parse(dataStorage) as ICurrent[] : [bynObj];
    const currentRate = dataCurrency.filter((obj) => arrCurrency.includes(obj.Cur_Abbreviation));
    const map = currentRate.map((obj) => [obj.Cur_Abbreviation, Math.round((obj.Cur_OfficialRate * 10000) / obj.Cur_Scale) / 10000]);
    setObjRate(Object.fromEntries(map));
    setValue(amountLocal);
    setNoteValue(noteLocal);
  }, []);

  useEffect(() => {
    localStorage.setItem('amount', value);
    localStorage.setItem('note', noteValue);
  }, [value, noteValue]);

  async function fetchPost() {
    if (name !== '') {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: 0 - Number(value),
          currency,
          date: new Date(time).toISOString(),
          note: noteValue === '' ? '-' : noteValue,
          user_id: userId,
          category: name,
          ...objRate,
        }),
      };
      try {
        const response = await fetch('./balans', requestOptions);
        const data = await response.json() as IBody[];
        if (response.ok) {
          localStorage.removeItem('amount');
          localStorage.removeItem('note');
          setData(data);
          navigate('home');
        } else console.log('Something went wrong');
      } catch (e) {
        console.log('Something went wrong');
      }
    } else navigate(linkCategory);
  }

  return (
    <section className='section'>
      <h4>{todayDate}</h4>
      <form className='form-enter' action='' id='form-enter-sum'>
        <Currency setCurrency={setCurrency} />
        <Result str={value} />
        <Note str={noteValue} setStr={setNoteValue} />
        <File />
      </form>
      <Calc setStr={setValue} />
      <div className='numeric-box'>
        <button className='btn-num__sum' type='button' onClick={fetchPost}>Subtract</button>
        <Link to={linkCategory} className='category-btn'>
          <img className='category-btn__img' src={linkIcon + (name === '' ? 'categorize.svg' : `categories/${name}.svg`)} alt='' />
          <span className='category-btn__text'>{name === '' ? 'Choose category' : name === 'phone' ? `${name}/Internet` : name}</span>
        </Link>
      </div>
    </section>
  );
};
