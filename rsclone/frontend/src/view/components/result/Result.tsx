import React, { useState } from 'react';
import './result.scss';

interface IProps {
  str: string;
}

export const Result = ({ str }:IProps) => {
  return (
    <label className='label-sum' htmlFor='enter-sum'>
      <input
        className='input-output'
        id='enter-sum'
        type='text'
        value={str}
      />
    </label>
  );
};
