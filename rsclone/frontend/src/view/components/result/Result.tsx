import React from 'react';
import './result.scss';

export const Result = () => {
  return (
    <label className='label-sum' htmlFor='enter-sum'>
      <input
        className='input-output'
        id='enter-sum'
        type='number'
        min={0.1}
        max={10000}
        step={0.1}
        autoComplete='off'
      />
    </label>
  );
};
