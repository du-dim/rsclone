/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import './addCategories.scss';

export const AddCategories = () => {
  const categoryArr = ['salary', 'deposits', 'savings', 'gifts', 'lottery'];
  const linkBalans = '../addBalans';
  return (
    <div className='page-category'>
      <h4>Income</h4>
      <div className='category-box'>
        {categoryArr.map((el) => (
          <Link to={linkBalans} key={`income_${el}`} state={{ category: el }} className='category-item'>
            <img className='category-img' src={`assets/icons/categories/${el}.svg`} alt='' />
            <p className='category-describe'>{el}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
