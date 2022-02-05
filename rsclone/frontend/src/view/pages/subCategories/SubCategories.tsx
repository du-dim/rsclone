/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import './subCategories.scss';

type IProps = {
  setName: React.Dispatch<React.SetStateAction<string>>,
}

export const SubCategories = ({ setName }:IProps) => {
  const categoryArr = ['bills', 'car', 'clothes', 'phone', 'entertainment', 'food', 'gifts', 'health', 'house', 'pets', 'transport', 'sports'];
  const linkBalans = '../subBalans';
  return (
    <div className='page-category'>
      <h4>Expense</h4>
      <div className='category-box'>
        {categoryArr.map((el) => (
          <Link to={linkBalans} key={`expense_${el}`} onClick={() => setName(el)} className='category-item'>
            <img className='category-img' src={`assets/icons/categories/${el}.svg`} alt='' />
            <p className='category-describe'>{el}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
