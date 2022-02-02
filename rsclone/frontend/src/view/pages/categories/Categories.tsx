/* eslint-disable max-len */
import React from 'react';
import './categories.scss';

export const Categories = () => {
  const expenseArr = ['bills', 'car', 'clothes', 'phone', 'entertainment', 'food', 'gifts', 'health', 'house', 'pets', 'transport', 'sports'];
  const incomeArr = ['salary', 'deposits', 'savings', 'gifts', 'lottery'];
  return (
    <div className='page'>
      <div className='categories'>
        <div className='categories__title'>Expense</div>
        {expenseArr.map((el) => (
          <div className={el === 'pets' ? 'categories__item' : 'categories__item active'} key={`expense_${el}`}>
            <img className='categories__item_img' src={`assets/icons/categories/${el}.svg`} alt='' />
            <p className='categories__item_text'>{el}</p>
          </div>
        ))}
      </div>
      <div className='categories'>
        <div className='categories__title'>Income</div>
        {incomeArr.map((el) => (
          <div className='categories__item active' key={`income_${el}`}>
            <img className='categories__item_img' src={`assets/icons/categories/${el}.svg`} alt='' />
            <p className='categories__item_text'>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
