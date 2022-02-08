/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import './modal.scss';

type IModal = {
 active: boolean,
 setActive: React.Dispatch<React.SetStateAction<boolean>>,
 message: string | undefined;
 error: string | undefined;
}

const Modal = ({
  active, setActive, message, error,
}:IModal) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className='modal__content'>
        <div className='modal__text'>
          {message}
          {error}
        </div>
        <Link to={!message ? '' : '../auth/login'} className='modal__btn'>
          {!message ? 'Retry' : 'Sign in'}
        </Link>
      </div>
    </div>
  );
};

export default Modal;
