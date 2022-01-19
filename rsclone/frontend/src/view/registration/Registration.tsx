/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Text } from '../authorization/Authorization';
import './registration.scss';

export const Registration = () => {
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
            <button type='submit' className='registerbtn'>{Text.Signin}</button>
          </div>
          <form className='enter-data'>
            <label>
              {Text.Enteremail}
              <input
                type='text'
                placeholder='Username or email address'
                name='email'
                required
              />
            </label>
            <label htmlFor='psw'>
              {Text.Password}
              <input
                type='password'
                placeholder='Password'
                name='psw'
                required
              />
            </label>
            <label htmlFor='psw'>
              {Text.Repeat}
              <input
                type='password'
                placeholder='Password'
                name='psw'
                required
              />
            </label>
          </form>
          <button type='submit' className='registerbtn'>{Text.Signup}</button>
        </article>
      </div>
    </section>
  );
};
