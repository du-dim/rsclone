/* eslint-disable react/button-has-type */
import React from 'react';
import './calculator.scss';

export const Calculator = () => {
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
          <button className='btn-pink btn-del'>DEL</button>
          <button className='btn-pink'>/</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button className='btn-pink'>x</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button className='btn-pink'>+</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button className='btn-pink'>-</button>
          <button className='btn-pink'>.</button>
          <button>0</button>
          <button className='span-two btn-pink'>=</button>
        </div>
      </div>
    </section>
  );
};
