import React from 'react';
import './dateRange.scss';

type IProps = {
  dateStart: string,
  dateEnd: string,
  setDateStart: React.Dispatch<React.SetStateAction<string>>,
  setDateEnd: React.Dispatch<React.SetStateAction<string>>,
  today: string
}

export const DateRange = ({
  dateStart, dateEnd, setDateStart, setDateEnd, today,
}: IProps) => {
  return (
    <div className='date'>
      <div className='date__field'>
        <div className='date__field_start'>
          <div className='date__field_end title'>Start date</div>
          <input
            className='date__field_start input'
            type='date'
            name=''
            id=''
            value={dateStart}
            max={dateEnd}
            onChange={(e) => setDateStart(e.target.value)}
          />
        </div>
        <div className='date__field_end'>
          <div className='date__field_end title'>End date</div>
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
    </div>
  );
};
