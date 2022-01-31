/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../types/types';
import Modal from '../../components/modal/Modal';
import PreLoader from '../../components/loader/Loader';
import './registration.scss';

export const Registration = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '', password1: '', password2: '',
  });
  const [errorModal, setErrorModal] = useState<undefined | string>(undefined);
  const [messageModal, setMessageModal] = useState<undefined | string>(undefined);

  const changeInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };

  async function fetchPost() {
    if (form.email.trim() === ''
      || form.password1.trim() === ''
      || form.password2.trim() === '') {
      setActiveModal(true);
      setErrorModal('Fill in all the fields');
      setMessageModal(undefined);
    } else if (form.password1 !== form.password2) {
      setActiveModal(true);
      setErrorModal('Passwords don\'t match');
      setMessageModal(undefined);
    } else {
      setLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password1 }),
      };
      try {
        const response = await fetch('/auth/register', requestOptions);
        const data = await response.json();
        setLoading(false);
        setActiveModal(true);
        if (response.ok) {
          setMessageModal(data.message);
          setErrorModal(undefined);
        } else {
          setMessageModal(undefined);
          setErrorModal(data.message);
        }
      } catch (e) {
        setErrorModal('Something went wrong');
        setMessageModal(undefined);
      }
    }
  }

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
            <Link className='registerbtn' to='../auth/login'>
              {Text.Signin}
            </Link>
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
                name='password1'
                required
                onChange={changeInput}
              />
            </label>
            <label htmlFor='psw'>
              {Text.Repeat}
              <input
                type='password'
                placeholder='Password'
                name='password2'
                required
                onChange={changeInput}
              />
            </label>
          </form>
          <div className='loading' style={{ height: '50px' }}>
            {loading ? (<PreLoader />) : 'The minimum password length should be six characters'}
          </div>
          <button type='submit' className='registerbtn' onClick={fetchPost}>{Text.Signup}</button>
        </article>
      </div>
      <Modal
        active={activeModal}
        setActive={setActiveModal}
        message={messageModal}
        error={errorModal}
      />
    </section>
  );
};
