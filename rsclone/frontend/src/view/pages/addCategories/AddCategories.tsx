/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import './addCategories.scss';

type IProps = {
  setName: React.Dispatch<React.SetStateAction<string>>,
}

export const AddCategories = ({ setName }:IProps) => {
  const categoryArr = ['salary', 'deposits', 'savings', 'gifts', 'lottery'];
  const linkBalans = '../addBalans';
  return (
    <div className='page-category'>
      <h4>Income</h4>
      <div className='category-box'>
        {categoryArr.map((el) => (
          <Link to={linkBalans} key={`income_${el}`} onClick={() => setName(el)} className='category-item'>
            <img className='category-img' src={`assets/icons/categories/${el}.svg`} alt='' />
            <p className='category-describe'>{el}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
