import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './view/components/footer/Footer';
import { Header } from './view/components/header/Header';
import { useRoutes } from './routes';

export const App = () => {
  useNavigate();
  const isAuth = !!localStorage.getItem('token');
  const routes = useRoutes(isAuth);
  return (
    <div className='wrapper'>
      {isAuth ? (<Header />) : (<> </>)}
      {routes}
      {isAuth ? (<Footer />) : (<> </>)}
    </div>
  );
};
