import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Authorization } from './view/pages/authorization/Authorization';
import { Registration } from './view/pages/registration/Registration';
import { Desktopfirst } from './view/pages/mainpage/Desktopfirst';

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/' element={<Desktopfirst />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path='/auth/login' element={<Authorization />} />
      <Route path='/auth/register' element={<Registration />} />
    </Routes>
  );
};
