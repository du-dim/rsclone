import React, { useReducer } from 'react';
import './calculator.scss';

// function reducer (state, action): void{}

export const Calculator = () => {
  const [{currentOperand, previousOperand, operation},dispatch] = useReducer(reducer,{});
  return (
    <section className='calculator'>
      <div className='container'>
        <div className='calculator-grid'>
          <div className='output'>
            1
            <div className='previous-operand' />
            <div className='current-operand' />
          </div>
          <button className='span-two btn-pink' type='button'>AC</button>
          <button className='btn-del' type='button'>DEL</button>
          <button className='btn-pink' type='button'>/</button>
          <button className='btn-num' type='button'>1</button>
          <button className='btn-num' type='button'>2</button>
          <button className='btn-num' type='button'>3</button>
          <button className='btn-pink' type='button'>x</button>
          <button className='btn-num' type='button'>4</button>
          <button className='btn-num' type='button'>5</button>
          <button className='btn-num' type='button'>6</button>
          <button className='btn-pink' type='button'>+</button>
          <button className='btn-num' type='button'>7</button>
          <button className='btn-num' type='button'>8</button>
          <button className='btn-num' type='button'>9</button>
          <button className='btn-pink' type='button'>-</button>
          <button className='btn-pink' type='button'>.</button>
          <button className='btn-num' type='button'>0</button>
          <button className='span-two btn-pink' type='button'>=</button>
        </div>
      </div>
    </section>
  );
};
