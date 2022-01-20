import React from 'react';
import { Link } from 'react-router-dom';
import './desktopfirst.scss';

export const Desktopfirst = () => {
  return (
    <section className='page-main'>
      <div className='container'>
        <article className='current-status'>
          <Link className='todo-list' to='../makechanges'>
            <div className='paperclip' />
            <h3 className='title-list'>ToDo List</h3>
            <div className='todo-items' />
          </Link>
          <div className='todo-list_total'>
            <h2 className='title-balans'>BALANS</h2>
            <div className='current-balans'>
              <h2 className='currency'>$</h2>
              <h2 className='sum'>1000</h2>
            </div>
            <div className='todo-list_btn'>
              <Link className='todo-list_btn__plus' to='../makechanges' />
              <Link className='todo-list_btn__minus' to='../makechanges' />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
