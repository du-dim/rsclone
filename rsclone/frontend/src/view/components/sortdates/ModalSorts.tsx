import React, { useState } from 'react';

type Modal = {
  modalActive:boolean,
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>,
}

export const ModalSorts = ({ modalActive, setModalActive }:Modal) => {
  return (
    <div className='modal-sorts'>
      <div className='modal-content'>Descriptin</div>
    </div>
  );
};
