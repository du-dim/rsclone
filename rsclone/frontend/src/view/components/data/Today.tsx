import React from 'react';

export const Today = () => {
  const todayDate = new Date().toLocaleString('en-US', {
    day: '2-digit', weekday: 'short', month: 'long',
  });
  return (
    <h3>{todayDate}</h3>
  );
};
