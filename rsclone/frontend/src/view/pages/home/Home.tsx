import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../../components/todo/Todo';
import { TCurrency } from '../../../types/types';
import './home.scss';

type IProps = {
  sum: number,
  currency: TCurrency,
}

export const Home = ({ sum, currency }: IProps) => {
  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });
  return (
    <section className='page-main'>
      <article className='current-status'>
        {/* <Link className='todo-list' to='../makechanges'> */}
        <div className='todo-list'>
          <div className='paperclip' />
          <h2 className='title-list'>ToDo List</h2>
          <h4>
            {todayDate}
          </h4>
          <Todo />
        </div>
        {/* </Link> */}
        <div className='todo-list_total'>
          <h2 className='title-balans'>BALANS</h2>
          <div className='current-balans'>
            <div className='sum'>{sum}</div>
            <div className='currency'>{currency}</div>
          </div>
          <div className='todo-list_btn'>
            <Link className='todo-list_btn__plus' to='../addBalans' />
            <Link className='todo-list_btn__minus' to='../subBalans' />
          </div>
        </div>
      </article>
    </section>
  );
};
