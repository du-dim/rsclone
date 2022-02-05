import React from 'react';
import './result.scss';

interface IProps {
  str: string;
}

export const Result = ({ str }:IProps) => {
  return (
    <div className='enter-sum'>
      {str}
    </div>
  );
};
