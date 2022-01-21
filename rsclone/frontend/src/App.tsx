import React from 'react';
import { Footer } from './view/footer/Footer';
import { Header } from './view/header/Header';
import { useRoutes } from './routes';

export const App = () => {
  const isAuth = !!localStorage.getItem('token');

  const routes = useRoutes(isAuth);
  if (isAuth) {
    return (
      <div className='wrapper'>
        <Header />
        {routes}
        <Footer />
      </div>
    );
  }
  return (
    <div className='wrapper'>
      {routes}
    </div>
  );
};
