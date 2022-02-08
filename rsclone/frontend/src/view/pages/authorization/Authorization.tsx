/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PreLoader from '../../components/loader/Loader';
import './authorization.scss';
import { Text } from '../../../types/types';

interface IUser {
  _id: string,
  email: string,
  password: string
}
interface IRes {
  token: string,
  user: IUser,
  message: string | undefined
}

type IProps = {
  setId: React.Dispatch<React.SetStateAction<string>>,
}
export const Authorization = ({ setId }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '', password: '',
  });
  const [error, setError] = useState<undefined | string>(undefined);

  const changeInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  const navigate = useNavigate();

  async function fetchPost() {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    };
    try {
      const response = await fetch('/auth/login', requestOptions);
      const data = await response.json() as IRes;
      setLoading(false);
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        setId(data.user._id);
        navigate('/home');
      } else setError(data.message);
    } catch (e) {
      setError('Something went wrong');
    }
  }

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
          {/* <div className='social-btns'>
            <button className='google' type='button'>{Text.Google}</button>
            <button className='facebook' type='button'>{Text.Facebook}</button>
          </div> */}
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
          </form>
          <div className='loading' style={{ height: '50px' }}>
            {loading ? (<PreLoader />) : (<p style={{ color: 'red' }}>{!error ? '' : error}</p>)}
          </div>
          <button className='btnAuth' type='button' onClick={fetchPost}>{Text.Signin}</button>
          <Link to='../auth/register' className='signup btnAuth'>
            <p>
              {`${Text.Noaccount}`}
              <br />
              {`${Text.Signup}`}
            </p>
          </Link>
        </article>
      </div>
    </section>
  );
};
