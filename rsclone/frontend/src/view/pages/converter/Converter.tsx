import React from 'react';
import { Liveconvert } from '../../components/converter/Liveconvert';
import { Userconvert } from '../../components/converter/Userconvert';
import './converter.scss';

export const Converter = () => {
  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });

  const BASE_URL = 'https://www.nbrb.by/api/exrates/currencies';
  console.log(BASE_URL);

  return (
    <section className='converter'>
      <div className='container'>
        <article className='converter-content'>
          <h3 className='date'>{todayDate}</h3>
          <Userconvert />
          <Liveconvert />
        </article>
      </div>
    </section>
  );
};
