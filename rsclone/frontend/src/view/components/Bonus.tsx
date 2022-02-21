import React from 'react';

//! todo change let
const bonusCount = 0;

export const Bonus = () => {
  return (
    <div className='header__bonus'>
      <div className='header__bonus_img' />
      <div className='header__bonus_count'>{bonusCount}</div>
    </div>
  );
};
