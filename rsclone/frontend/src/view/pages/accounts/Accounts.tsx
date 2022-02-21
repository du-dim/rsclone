import React, { useState } from 'react';
import './accounts.scss';
import '../authorization/authorization.scss';
import { useNavigate } from 'react-router';
import * as types from '../../../types/types';

export const Accounts = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [modalExitActive, setModalExitActive] = useState(false);
  const turnModalExit = () => {
    setModalExitActive(true);
  };

  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const turnModalDelete = () => {
    setModalDeleteActive(true);
  };
  const exitFromProfile = ():void => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('auth/register');
  };

  return (
    <section className='page-profile'>
      <article className='profile'>
        <div className='profile__title'>{types.Text.Wisely}</div>
        <div className='profile__animation'>
          <h4 className='animation-message'>{types.Text.Describe}</h4>
        </div>
        <div className='user-info'>
          <div className='user-info__img' />
          {/* <ul className='user-info__name'>
            <li className='user-info__name_title'>{Text.Name}</li>
            <li className='user-info__name_user-name'>{111}</li>
          </ul> */}
          <ul className='user-info__email'>
            <li className='user-info__email_title'>{types.Text.EmailAddress}</li>
            <li className='user-info__email_user-email'>{email}</li>
          </ul>
        </div>
        <ul className='profile__del'>
          <li
            className='profile__out_btn'
            onClick={() => {
              turnModalExit();
            }}
          >
            {types.Text.Exit}

          </li>
          <li
            className='profile__del_btn'
            onClick={() => {
              turnModalDelete();
            }}
          >
            {types.Text.DeleteProfile}

          </li>
        </ul>
      </article>

      <div
        className={modalExitActive ? 'modal-exit active' : 'modal-exit'}
        onClick={() => setModalExitActive(false)}
      >
        <div
          className={modalExitActive ? 'modal-exit__content active' : 'modal-content'}
          onClick={(e) => e.stopPropagation}
        >
          <div className='info'>
            <p className='info__warning'>Are you sure want to get out? </p>
            <div className='info__btn' onClick={() => exitFromProfile()}>YES. LOG OUT</div>
          </div>
        </div>
      </div>
      <div
        className={modalDeleteActive ? 'modal-del active' : 'modal-del'}
        onClick={() => setModalDeleteActive(false)}
      >
        <div
          className={modalDeleteActive ? 'modal-del__content active' : 'modal-content'}
          onClick={(e) => e.stopPropagation}
        >
          <div className='info'>
            <p className='info__warning'>Are you sure want to delete? </p>
            <div className='info__btn' onClick={() => exitFromProfile()}>YES. Delete</div>
          </div>
        </div>
      </div>
    </section>
  );
};
