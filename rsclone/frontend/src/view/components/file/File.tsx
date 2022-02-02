import React from 'react';
import './file.scss';

export const File = () => {
  return (
    <label className='label-files' htmlFor='enter-file'>
      <span className='file' />
      <input className='input' id='enter-file' type='file' />
    </label>
  );
};
