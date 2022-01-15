import React, { useState, useEffect } from 'react';
import './main.scss';

export const Main = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((response) => setData(response.message));
  }, []);
  return (
    <section className='main'>
      <div className='container'>
        {!data ? 'Loading...' : data}
      </div>
    </section>
  );
};
