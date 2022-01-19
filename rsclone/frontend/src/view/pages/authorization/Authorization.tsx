/* eslint-disable jsx-a11y/label-has-associated-control */
// import { eventNames } from 'process';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './authorization.scss';
import { Text } from '../../../types/types';

export const Authorization = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const changeInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const login = async () => {
    try {
      const data = axios.post('/auth/login', { ...form });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className='page-authorization'>
      <div className='container'>
        <article className='authorization-form'>
          <div className='greeting'>
            <div className='logo' />
            <h3 className='h3'>{Text.Wisely}</h3>
            <p className='greeting-message'>{Text.Describe}</p>
          </div>
          <h3 className='sign-title'>{Text.Signin}</h3>
          <div className='social-btns'>
            <button className='google' type='button'>{Text.Google}</button>
            <button className='facebook' type='button'>{Text.Facebook}</button>
          </div>
          <form className='enter-data'>
            <label>
              {Text.Enteremail}
              <input
                type='text'
                placeholder='Username or email address'
                name='email'
                required
                onChange={changeInput}
              />
            </label>
            <label htmlFor='psw'>
              {Text.Password}
              <input
                type='password'
                placeholder='Password'
                name='password'
                required
                onChange={changeInput}
              />
            </label>
            <input className='forgot-psw' type='submit' value={Text.Forgot} />
          </form>
          <button type='submit' className='registerbtn' onClick={login}>{Text.Signin}</button>
          <Link to='../auth/register' className='signup'>
            <p>{Text.Noaccount}</p>
            <p>{Text.Signup}</p>
          </Link>
        </article>
      </div>
    </section>
  );
};
