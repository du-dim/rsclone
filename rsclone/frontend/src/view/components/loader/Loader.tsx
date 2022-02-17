/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './loader.scss';

const PreLoader = () => {
  return (
    <div className='transition-loader'>
      <div className='transition-loader-inner'>
        <label />
        <label />
        <label />
        <label />
        <label />
      </div>
    </div>
  );
};

export default PreLoader;
