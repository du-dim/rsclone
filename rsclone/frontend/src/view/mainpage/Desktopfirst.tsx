import React from 'react';
import './desktopfirst.scss';

export const Desktopfirst = () => {
  return (
    <section className='page-main'>
      <div className='container'>
        <article className='current-status'>
          <div className='todo-list'>
            <div className='paperclip' />
            <h3 className='title-list'>ToDo List</h3>
            <div className='todo-items' />
          </div>
          <div className='todo-list_total'>
            <h2 className='title-balans'>BALANS</h2>
            <div className='current-balans'>
              <h2 className='currency'>$</h2>
              <h2 className='sum'>1000</h2>
            </div>
            <ul className='todo-list_btn'>
              <li className='todo-list_btn__plus' />
              <li className='todo-list_btn__minus' />
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
};
