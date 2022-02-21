import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bonus } from '../Bonus';
import { Settings } from '../settings/Settings';
import './header.scss';

export const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <section className='header'>
        <div className='header__content'>
          <h1 className='header__h1-hidden'>wisely</h1>
          <Link to='/home' className='header__logo' />
          <Bonus />
          <nav className='header__nav' onClick={() => { setShow(!show); }} />
        </div>
      </section>
      <Settings active={show} setActive={setShow} />
    </>
  );
};
