import React from 'react';

interface IProps {
  setAmount: React.Dispatch<React.SetStateAction<number>>,
  amount: number,
  setFocus: React.Dispatch<React.SetStateAction<boolean>>
}

export const InputConverter = ({ amount, setAmount, setFocus }: IProps) => {
  const changeAmount = (val: number) => {
    setAmount(val);
  };

  return (
    <input
      className='currency-input'
      type='number'
      value={amount}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onChange={(e) => changeAmount(Number(e.target.value))}
    />
  );
};
