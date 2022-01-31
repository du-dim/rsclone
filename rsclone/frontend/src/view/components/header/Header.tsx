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
        <div className='header-content'>
          <h1 className='h1'>wisely</h1>
          <Link to='/home' className='logo' />
          <Bonus />
          <nav className='header-nav' onClick={() => { setShow(!show); }} />
        </div>
      </section>
      <Settings active={show} setActive={setShow} />
    </>
  );
};
