import React from 'react';
import './accounts.scss';
import '../authorization/authorization.scss';
import { Text } from '../../../types/types';

export const Accounts = () => {
  const userProfile = localStorage.getItem('token');
  console.log(userProfile);
  return (
    <section className='page-profile'>
      <article className='profile'>
        <div className='profile__logo' />
        <div className='profile__animation'>
          <h4 className='animation-message'>{Text.Describe}</h4>
        </div>
        <div className='user-info'>
          <div className='user-info__img' />
          <ul className='user-info__name'>
            <li className='user-info__name_title'>{Text.Name}</li>
            <li className='user-info__name_user-name'>{111}</li>
          </ul>
          <ul className='user-info__email'>
            <li className='user-info__email_title'>{Text.EmailAddress}</li>
            <li className='user-info__email_user-email'>{111}</li>
          </ul>
        </div>
        <ul className='profile__del'>
          <li
            className='profile__del_btn'
            onClick={() => {
              // turnModal();
            }}
          >
            {Text.Exit}

          </li>
          <li className='profile__del_btn'>{Text.DeleteProfile}</li>
        </ul>
      </article>
    </section>
  );
};
