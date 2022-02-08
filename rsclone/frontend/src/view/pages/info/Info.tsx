import React from 'react';
import { Links } from '../../../types/types';
import './info.scss';

export const Info = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section className='section'>
      <div className='container'>
        <article className='authors-page'>
          <h3>About our team</h3>
          <ul className='list-authors'>
            <li className='list-authors__item'>
              <a className='name team-lide' href={Links.Dima} target='_blank' rel='noreferrer'>Dzmitry Dubovik</a>
              <p className='describe'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, nihil!</p>
            </li>
            <li className='list-authors__item'>
              <a className='name' href={Links.Kate} target='_blank' rel='noreferrer'>Katsiaryna Shaustruk</a>
              <p className='describe'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium, asperiores.
              </p>
            </li>
            <li className='list-authors__item'>
              <a className='name' href={Links.Alena} target='_blank' rel='noreferrer'>Alena Krasinskiene</a>
              <p className='describe'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, harum?</p>
            </li>
          </ul>
          <div className='info-project'>
            <p className='info-project__title'>About the Project</p>
            <p className='info-project__describe'>
              The final task within the course «JavaScript/Front-end» from
              The Rolling Scopes School
            </p>
          </div>
          <div className='info'>
            <a className='link-school red' href='https://rs.school/' target='_blank' rel='noreferrer'>RS School</a>
            <div className='date'>{year}</div>
          </div>
        </article>
      </div>
    </section>
  );
};
