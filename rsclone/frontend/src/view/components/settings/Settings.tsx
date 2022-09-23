import React from 'react';
import { Link } from 'react-router-dom';
import './settings.scss';

type IRight = {
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Settings = ({ active, setActive }:IRight) => {
  const arrSettings = ['Categories', 'Currency', 'Accounts', 'Info'];
  const linkIcon = 'assets/icons/settings/';
  return (
    <div className='settings-container' style={{ display: active ? 'block' : 'none' }} onClick={() => setActive(false)}>
      <div className='settings' style={{ right: active ? '0' : '-50%' }}>
        {arrSettings.map((el) => (
          <Link key={el} className='settings__block' to={`../${el}`}>
            <img className='settings__block_img' src={`/${linkIcon + el}.svg`} alt='' />
            <p className='settings__block_text'>{el}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
