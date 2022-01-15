import React from 'react';

//! todo change let
const bonusCount = 0;

export const Bonus = () => {
  return (
    <div className='header-bonus'>
      <div className='header-bonus__img' />
      <div className='header-bonus__count'>{bonusCount}</div>
    </div>
  );
};
