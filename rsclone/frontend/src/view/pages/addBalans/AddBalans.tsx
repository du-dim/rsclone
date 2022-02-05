/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calc } from '../../components/calc/Calc';
import { Note } from '../../components/note/Note';
import { Result } from '../../components/result/Result';
import { File } from '../../components/file/File';
import { Currency } from '../../components/currency/Currency';
import { IBody } from '../../../types/types';
import './addBalans.scss';

export interface IDATE {
  year: string,
  month: string,
  day: string
}

type IProps = {
  name: string,
  setData: React.Dispatch<React.SetStateAction<IBody[]>>,
}

export const AddBalans = ({ name, setData }:IProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [value, setValue] = useState('');
  const [noteValue, setNoteValue] = useState('');
  const linkCategory = '../addCategories';
  const linkIcon = 'assets/icons/';
  const time = new Date().getTime() + 3 * 60 * 60 * 1000;
  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });
  const form = {
    amount: 0, currency: 'USD', date: new Date(time).toISOString(), category: '-', note: '', user_id: '-',
  };

  useEffect(() => {
    const amountLocal = localStorage.getItem('amount') ? localStorage.getItem('amount') as string : '';
    const noteLocal = localStorage.getItem('note') ? localStorage.getItem('note') as string : '';
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
          amount: Number(value),
          currency: 'USD',
          date: new Date(time).toISOString(),
          note: noteValue === '' ? '-' : noteValue,
          user_id: userId,
          category: name,
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
      <div className='form-enter'>
        <Currency />
        <Result str={value} />
        <Note str={noteValue} setStr={setNoteValue} />
        <File />
      </div>
      <Calc setStr={setValue} />
      <div className='numeric-box'>
        <button className='btn-num__add' type='button' onClick={fetchPost}>add</button>
        <Link to={linkCategory} className='category-btn'>
          <img className='category-btn__img' src={linkIcon + (name === '' ? 'categorize.svg' : `categories/${name}.svg`)} alt='' />
          <span className='category-btn__text'>{name === '' ? 'Choose category' : name === 'phone' ? `${name}/Internet` : name}</span>
        </Link>
      </div>
    </section>
  );
};
