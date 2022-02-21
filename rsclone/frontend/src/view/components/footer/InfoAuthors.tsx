import React from 'react';
import { Links } from '../../../types/types';
import './footer.scss';

export const InfoAuthors = () => {
  return (
    <ul className='list-authors'>
      <li className='list-authors__item'>
        <a
          className='list-authors__item_rs-school'
          href='https://rs.school/'
          target='_blank'
          rel='noreferrer'
        >
          RS School

        </a>
      </li>
      <li className='list-authors__item'>
        <a
          className='list-authors__item_name'
          href={Links.Kate}
          target='_blank'
          rel='noreferrer'
        >
          Katsiaryna

        </a>
      </li>
      <li className='list-authors__item'>
        <a
          className='list-authors__item_team-lead'
          href={Links.Dima}
          target='_blank'
          rel='noreferrer'
        >
          Dzmitry

        </a>
      </li>
      <li className='list-authors__item'>
        <a
          className='list-authors__item_name'
          href={Links.Alena}
          target='_blank'
          rel='noreferrer'
        >
          Alena

        </a>
      </li>
      <li className='list-authors__item list-authors__item_date'>
        {2022}
      </li>
    </ul>
  );
};
