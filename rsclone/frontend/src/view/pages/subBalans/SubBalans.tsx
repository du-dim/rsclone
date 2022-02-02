/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calc } from '../../components/calc/Calc';
import { Note } from '../../components/note/Note';
import { Result } from '../../components/result/Result';
import { File } from '../../components/file/File';
import { Currency } from '../../components/currency/Currency';
import './subBalans.scss';

export interface IDATE {
  year: string,
  month: string,
  day: string
}
interface IStateCategory {
  category: string
}

export const SubBalans = () => {
  const location = useLocation();
  const funcCategory = () => {
    const { category } = location.state as IStateCategory;
    return category;
  };

  const linkCategory = '../subCategories';
  const linkIcon = 'assets/icons/';

  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });
  const [value, setValue] = useState('');

  return (
    <section className='section'>
      <h4>{todayDate}</h4>
      <form className='form-enter' action='' id='form-enter-sum'>
        <Currency />
        <Result str={value} />
        <Note />
        <File />
      </form>
      <Calc setStr={setValue} />
      <div className='numeric-box'>
        <button className='btn-num__add' type='submit' form='form-enter-sum' value='Submit'>add</button>
        <Link to={linkCategory} className='category-btn'>
          <img className='category-btn__img' src={linkIcon + (!location.state ? 'categorize.svg' : `categories/${funcCategory()}.svg`)} alt='' />
          <span className='category-btn__text'>{!location.state ? 'Choose category' : funcCategory() === 'phone' ? `${funcCategory()}/Internet` : funcCategory()}</span>
        </Link>
      </div>
    </section>
  );
};
