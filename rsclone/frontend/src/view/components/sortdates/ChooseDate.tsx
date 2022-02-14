import React, { useState } from 'react';

export const ChooseDate = () => {
  const time = new Date().getTime() + 3 * 60 * 60 * 1000;
  const today = new Date(time).toISOString().split('T')[0];
  const [dateStart, setDateStart] = useState(new Date(time - 604800000).toISOString().split('T')[0]);
  const [dateEnd, setDateEnd] = useState(today);
  return (
    <div className='date-box'>
      <div className='date-box__start'>
        <h3 className='date-box__title'>From</h3>
        <input
          className='input'
          type='date'
          name=''
          id=''
          value={dateStart}
          max={dateEnd}
          onChange={(e) => setDateStart(e.target.value)}
        />
      </div>
      <div className='date-box__end'>
        <h3 className='date-box__title'>To</h3>
        <input
          className='date__field_end input'
          type='date'
          name=''
          id=''
          value={dateEnd}
          min={dateStart}
          max={today}
          onChange={(e) => setDateEnd(e.target.value)}
        />
      </div>
    </div>
  );
};
