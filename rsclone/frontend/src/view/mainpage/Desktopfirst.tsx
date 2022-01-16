import React from 'react';
import './desktopfirst.scss';

export const Desktopfirst = () => {
  return (
    <section className='page-main'>
      <div className='container'>
        <article className='current-balans'>
          <div className='todo-list'>
            <div className='paperclip' />
            <h3 className='title-list'>ToDo List</h3>
            <div className='todo-items' />
          </div>
          <div className='todo-list_total'>
            <h2 className='title-balans'>BALANS</h2>
            <div className='current-balans'>
              <div className='currency'>$</div>
              <div className='sum'>1000</div>
            </div>
          </div>
          <ul className='todo-list_btn'>
            <li className='todo-lost_btn__plus' />
            <li className='todo-lost_btn__minus' />
          </ul>
        </article>
      </div>
    </section>
  );
};
