import React from 'react';

interface IProps {
  name: string,
  value: number
}

export const Rate = ({ name, value }:IProps) => {
  return (
    <div className='item-curriency'>
      <h3 className='item-curriency__symbol'>{name}</h3>
      <div className='item-curriency__value'>{value}</div>
    </div>
  );
};
