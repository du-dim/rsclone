/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import './categories.scss';

type IProps = {
  arrExpense: boolean[],
  arrIncome: boolean[],
  setArrExpense: React.Dispatch<React.SetStateAction<boolean[]>>,
  setArrIncome: React.Dispatch<React.SetStateAction<boolean[]>>,
}
export const Categories = ({
  arrExpense, arrIncome, setArrExpense, setArrIncome,
}: IProps) => {
  const expenseArr = ['bills', 'car', 'clothes', 'phone', 'entertainment', 'food', 'gifts', 'health', 'house', 'pets', 'transport', 'sports'];
  const incomeArr = ['salary', 'deposits', 'savings', 'gifts', 'lottery'];

  return (
    <div className='page-categories'>
      <div className='categories'>
        <div className='categories__title'>Expense</div>
        {expenseArr.map((el, index) => (
          <div
            className={arrExpense[index] ? 'categories__item active' : 'categories__item'}
            key={`expense_${el}`}
            onClick={() => setArrExpense(arrExpense.map((e: boolean, i) => (i === index ? !e : e)))}
          >
            <img className='categories__item_img' src={`assets/icons/categories/${el}.svg`} alt='' />
            <p className='categories__item_text'>{el}</p>
          </div>
        ))}
      </div>
      <div className='categories'>
        <div className='categories__title'>Income</div>
        {incomeArr.map((el, index) => (
          <div
            className={arrIncome[index] ? 'categories__item active' : 'categories__item'}
            key={`income_${el}`}
            onClick={() => setArrIncome(arrIncome.map((e: boolean, i) => (i === index ? !e : e)))}
          >
            <img className='categories__item_img' src={`assets/icons/categories/${el}.svg`} alt='' />
            <p className='categories__item_text'>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
