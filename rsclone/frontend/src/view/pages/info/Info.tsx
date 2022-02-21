import React from 'react';
import { Links } from '../../../types/types';
import './info.scss';

export const Info = () => {
  // const date = new Date();
  // const year = date.getFullYear();
  return (
    <section className='section'>
      <div className='container'>
        <article className='authors-page'>
          <h3>About our team</h3>
          <ul className='list-authors'>
            <li className='list-authors__item'>
              <a className='name team-lide' href={Links.Dima} target='_blank' rel='noreferrer'>Dzmitry Dubovik</a>
              <p className='describe'>
                <b>Team lead</b>
                <br />
                <b>React</b>
                <br />
                <b>back-end: </b>
                nodejs, mongoose, express, Rest ApI, registration, authorization
                <br />
                <b>frontend: </b>
                {' '}
                Canvas, Local Storage, Typescript, SCSS, grid, routing, adaptive, animation
              </p>
            </li>
            <li className='list-authors__item'>
              <a className='name' href={Links.Kate} target='_blank' rel='noreferrer'>Katsiaryna Shaustruk</a>
              <p className='describe'>
                <b>React</b>
                <br />
                <b>frontend: </b>
                {' '}
                API, Local Storage, Typescript, SCSS, grid, adaptive
              </p>
            </li>
            <li className='list-authors__item'>
              <a className='name' href={Links.Alena} target='_blank' rel='noreferrer'>Alena Krasinskiene</a>
              <p className='describe'>
                <b>design:</b>
                <br />
                Figma
              </p>
            </li>
          </ul>
          <div className='info-project'>
            <p className='info-project__title'>About the Project</p>
            <p className='info-project__describe'>
              The final task within the course «JavaScript/Front-end»
              <br />
              from The Rolling Scopes School
              <br />
              Clone of app for accounting your personal finance
            </p>
          </div>
          <div className='info'>
            <a className='link-school red' href='https://rs.school/' target='_blank' rel='noreferrer'>RS School</a>
            <div className='date'>{2022}</div>
          </div>
        </article>
      </div>
    </section>
  );
};
