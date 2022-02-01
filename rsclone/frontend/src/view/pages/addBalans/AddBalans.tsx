import React, { useState } from 'react';
import './addBalans.scss';
import '../calculator/calculator.scss';

export interface IDATE {
  year: string,
  month: string,
  day: string
}

export const AddBalans = () => {
  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });
  const currencytype = '$';
  /*---------------------*/

  const state = {
    out: '0',
  };

  const [result, setResult] = useState('');

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    setResult(result.concat(e.currentTarget?.name));
  };

  const clear = () => {
    setResult('');
  };

  const calc = () => {
    try {
      /* eslint-disable no-eval */
      setResult(Number(eval(result).toString()).toFixed(2));
    } catch (error) {
      setResult('invalid format');
    }
  };
  /*----------------------*/

  return (
    <section className='section'>
      <div className='container'>
        <article className='add-sum'>
          <h4>{todayDate}</h4>
          <div className='currency'>
            <span className='currency-type'>{currencytype}</span>
            <span className='currency-img'>{}</span>
          </div>
          <form className='form-enter' action='' id='form-enter-sum'>
            <label className='label-sum' htmlFor='enter-sum'>
              <input
                className='input-output'
                id='enter-sum'
                type='number'
                min={0.1}
                max={10000}
                step={0.1}
                autoComplete='off'
                defaultValue={state.out}
                value={result}
              />
            </label>
            <label className='label-notes' htmlFor='enter-notes'>
              <span className='notes' />
              <input className='input' id='enter-notes' type='text' autoComplete='off' />
            </label>
            <label className='label-files' htmlFor='enter-file'>
              <span className='file' />
              <input className='input' id='enter-file' type='file' />
            </label>
          </form>
          <div className='numeric-box'>
            <div className='choose-category'>
              <span className='category-btn'>Choose category</span>
            </div>
            <div className='numeric-area'>
              <button name='1' className='btn-num' type='button' onClick={handleClick}>1</button>
              <button name='2' className='btn-num' type='button' onClick={handleClick}>2</button>
              <button name='3' className='btn-num' type='button' onClick={handleClick}>3</button>
              <button name='+' className='btn-num' type='button' onClick={handleClick}>+</button>
              <button name='4' className='btn-num' type='button' onClick={handleClick}>4</button>
              <button name='5' className='btn-num' type='button' onClick={handleClick}>5</button>
              <button name='6' className='btn-num' type='button' onClick={handleClick}>6</button>
              <button name='-' className='btn-num' type='button' onClick={handleClick}>-</button>
              <button name='7' className='btn-num' type='button' onClick={handleClick}>7</button>
              <button name='8' className='btn-num' type='button' onClick={handleClick}>8</button>
              <button name='9' className='btn-num' type='button' onClick={handleClick}>9</button>
              <button name='*' className='btn-num' type='button' onClick={handleClick}>*</button>
              <button name='0' className='btn-num' type='button' onClick={handleClick}>0</button>
              <button className='btn-num btn-num__del' onClick={clear} type='button'>DEL</button>
              <button name='=' className='btn-num btn-num__calc' type='button' onClick={calc}>=</button>
              <button name='/' className='btn-num' type='button' onClick={handleClick}>/</button>
            </div>
            <button className='btn-num btn-num__add' type='submit' form='form-enter-sum' value='Submit'>add</button>
          </div>
          <ul className='category-box hidden'>
            <li className='category-item'>
              <div className='category-img bills' />
              <p className='category-describe'>Bills</p>
            </li>
            <li className='category-item'>
              <div className='category-img car' />
              <p className='category-describe'>Car</p>
            </li>
            <li className='category-item'>
              <div className='category-img clothes' />
              <p className='category-describe'>Clothes</p>
            </li>
            <li className='category-item'>
              <div className='category-img phone' />
              <p className='category-describe'>Phone/Internet</p>
            </li>
            <li className='category-item'>
              <div className='category-img entertainment' />
              <p className='category-describe'>Entertainment</p>
            </li>
            <li className='category-item'>
              <div className='category-img food' />
              <p className='category-describe'>Food</p>
            </li>
            <li className='category-item'>
              <div className='category-img gifts' />
              <p className='category-describe'>Gifts</p>
            </li>
            <li className='category-item '>
              <div className='category-img health' />
              <p className='category-describe'>Health</p>
            </li>
            <li className='category-item'>
              <div className='  category-img house' />
              <p className='category-describe'>House</p>
            </li>
            <li className='category-item'>
              <div className='category-img pets' />
              <p className='category-describe'>Pets</p>
            </li>
            <li className='category-item'>
              <div className='category-img transport' />
              <p className='category-describe'>Transport</p>
            </li>
            <li className='category-item'>
              <div className='category-img sports' />
              <p className='category-describe'>Sports</p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};
