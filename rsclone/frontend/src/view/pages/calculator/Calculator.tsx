/* eslint-disable react/button-has-type */
import React from 'react';
import './calculator.scss';

// function reducer (state, action): void{}

export const Calculator = () => {
  // const [state, dispatch] = useReducer(reducer, {});
  return (
    <section className='calculator'>
      <div className='container'>
        <div className='calculator-grid'>
          <div className='output'>
            1
            <div className='previous-operand' />
            <div className='current-operand' />
          </div>
          <button className='span-two btn-pink'>AC</button>
          <button className='btn-del'>DEL</button>
          <button className='btn-pink'>/</button>
          <button className='btn-num'>1</button>
          <button className='btn-num'>2</button>
          <button className='btn-num'>3</button>
          <button className='btn-pink'>x</button>
          <button className='btn-num'>4</button>
          <button className='btn-num'>5</button>
          <button className='btn-num'>6</button>
          <button className='btn-pink'>+</button>
          <button className='btn-num'>7</button>
          <button className='btn-num'>8</button>
          <button className='btn-num'>9</button>
          <button className='btn-pink'>-</button>
          <button className='btn-pink'>.</button>
          <button className='btn-num'>0</button>
          <button className='span-two btn-pink'>=</button>
        </div>
      </div>
    </section>
  );
};
