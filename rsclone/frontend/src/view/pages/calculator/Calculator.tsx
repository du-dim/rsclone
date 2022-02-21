/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import './calculator.scss';

// function reducer (state, action): void{}

export const Calculator = () => {
  // const [{currentOperand, previousOperand, operation},dispatch] = useReducer(reducer,{});
  const [data, setData] = useState('');
  const calcBtns:any[] = [];
  const numberArray = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.'];
  const clear = 'Clear';
  const del = 'Del';
  numberArray.forEach((item) => {
    calcBtns.push(
      <button
        className='btn-digits'
        type='button'
        onClick={(e) => {
          setData(data + e.currentTarget.value);
        }}
        value={item}
        key={item}
      >
        { item }
      </button>,
    );
  });
  return (
    <section className='calculator'>
      <div className='container'>
        <h3 className='calculator__tittle'>Calculator</h3>
        <div className='calculator__grid'>
          <div className='show-input'>{data}</div>
          <div className='digits flex'>{calcBtns}</div>
          <div className='modifiers subgrid'>
            <button className='btn-clear' type='button' onClick={() => setData(data.substring(0, data.length - 1))}>
              {clear}
            </button>
            <button className='btn-del' type='button' onClick={() => setData('')}>
              {del}
            </button>
          </div>
          <div className='operations subgrid'>
            <button type='button' onClick={(e) => { setData(data + e.currentTarget.value); }} value='+'>
              +
            </button>
            <button type='button' onClick={(e) => { setData(data + e.currentTarget.value); }} value='-'>
              -
            </button>
            <button type='button' onClick={(e) => { setData(data + e.currentTarget.value); }} value='*'>
              *
            </button>
            <button type='button' onClick={(e) => { setData(data + e.currentTarget.value); }} value='/'>
              /
            </button>
            <button
              className='btn sum'
              type='button'
              onClick={() => {
                try {
                  setData(
                    String(eval(data)).length > 3
                   && String(eval(data)).includes('.')
                      ? String(eval(data).toFixed(4))
                      : String(eval(data)),
                  );
                } catch (error) {
                  setData('Sorry!');
                  setData('');
                }
              }}
            >
              =

            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
