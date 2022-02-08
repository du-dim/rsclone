/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import './calc.scss';

type IProps = {
  setStr: React.Dispatch<React.SetStateAction<string>>,
}

export const Calc = ({ setStr }:IProps) => {
  const btnArr = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', 'DEL', '=', '/'];
  const [result, setResult] = useState('');

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    setResult(result.concat(e.currentTarget?.name));
    setStr(result.concat(e.currentTarget?.name));
  };

  const clear = () => {
    setResult('');
    setStr('');
  };
  const calc = () => {
    try {
      /* eslint-disable no-eval */
      setResult(Number(eval(result).toString()).toFixed(2));
      setStr(Number(eval(result).toString()).toFixed(2));
    } catch (error) {
      setResult('invalid format');
      setStr('invalid format');
    }
  };

  return (
    <div className='numeric-area'>
      {btnArr.map((el) => (
        <button
          key={el}
          name={el}
          className={el === 'DEL' ? 'btn-num btn-num__del' : el === '=' ? 'btn-num btn-num__calc' : 'btn-num'}
          type='button'
          onClick={el === '=' ? calc : el === 'DEL' ? clear : handleClick}
        >
          {el}
        </button>
      ))}
    </div>
  );
};
