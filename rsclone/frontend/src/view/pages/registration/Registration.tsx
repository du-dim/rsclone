/* eslint-disable jsx-a11y/label-has-associated-control */
// import { eventNames } from 'process';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Text } from '../../../types/types';
import './registration.scss';

export const Registration = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const changeInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const register = async () => {
    try {
      const data = await axios.post('/auth/register', { ...form });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className='page-registration'>
      <div className='container'>
        <article className='registration-form'>
          <div className='greeting'>
            <div className='logo' />
            <h3 className='h3'>{Text.Wisely}</h3>
            <p className='greeting-message'>{Text.Describe}</p>
          </div>
          <div className='signin'>
            <p>{Text.Haveaccount}</p>
            <button type='submit' className='registerbtn'>
              {Text.Signin}
            </button>
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
            <label htmlFor='psw'>
              {Text.Repeat}
              <input
                type='password'
                placeholder='Password'
                name='password'
                required
              />
            </label>
          </form>
          <button type='submit' className='registerbtn' onClick={register}>{Text.Signup}</button>
        </article>
      </div>
    </section>
  );
};
