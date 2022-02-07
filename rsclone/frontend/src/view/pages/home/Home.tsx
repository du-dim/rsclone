import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Todo } from '../../components/todo/Todo';
// import { Todo } from '../../components/todo/Todo';
import './home.scss';

type IProps = {
  sum: number,
}

export const Home = ({ sum }: IProps) => {
  return (
    <section className='page-main'>
      <article className='current-status'>
        {/* <Link className='todo-list' to='../makechanges'> */}
        <div className='todo-list'>
          <div className='paperclip' />
          <h3 className='title-list'>ToDo List</h3>
          <Todo />
        </div>
        {/* </Link> */}
        <div className='todo-list_total'>
          <h2 className='title-balans'>BALANS</h2>
          <div className='current-balans'>
            <div className='currency'>$</div>
            <div className='sum'>{sum}</div>
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
