import React from 'react';

export const Liveconvert:React.FC = () => {
  return (
    <div className='live-convert'>
      <h3>Live Exchange Rates</h3>
      <div className='list-curriency'>
        <div className='symbol-dol'>$</div>
        <div className='value-dol' />
      </div>
    </div>
  );
};
