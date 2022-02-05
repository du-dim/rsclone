import React from 'react';
import './note.scss';

type IProps = {
  str: string,
  setStr: React.Dispatch<React.SetStateAction<string>>,
}

export const Note = ({ str, setStr }:IProps) => {
  const changeInput = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setStr(target.value);
  };

  return (
    <label className='label-notes' htmlFor='enter-notes'>
      <span className='notes' />
      <input className='input' id='enter-notes' type='text' value={str} autoComplete='off' onChange={changeInput} />
    </label>
  );
};
