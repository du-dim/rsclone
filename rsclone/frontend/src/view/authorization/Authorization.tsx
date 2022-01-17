/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './authorization.scss';

export enum Text {
Wisely = 'Wisely',
Describe = 'the key to the success of your budget!',
Signin = 'Sign in',
Signup = 'Sign up',
Google = 'Sign with Google',
Facebook = 'Sign with Facebook',
Enteremail = 'Enter your username or email address',
Password = 'Password',
Forgot = 'Forgot password',
Noaccount = 'No Account?',
}
export const Authorization = () => {
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
            <input className='forgot-psw' type='submit' value={Text.Forgot} />
          </form>
          <button type='submit' className='registerbtn'>{Text.Signin}</button>
          <div className='signup'>
            <p>{Text.Noaccount}</p>
            <p>{Text.Signup}</p>
          </div>
        </article>
      </div>
    </section>
  );
};
