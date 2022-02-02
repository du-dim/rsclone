import React from 'react';
import './note.scss';

export const Note = () => {
  return (
    <label className='label-notes' htmlFor='enter-notes'>
      <span className='notes' />
      <input className='input' id='enter-notes' type='text' autoComplete='off' />
    </label>
  );
};
