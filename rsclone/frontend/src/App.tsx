import React from 'react';
import { Footer } from './view/footer/Footer';
import { Header } from './view/header/Header';
import { useRoutes } from './routes';

export const App = () => {
  const routes = useRoutes(false);
  return (
    <div className='wrapper'>
      <Header />
      {routes}
      <Footer />
    </div>
  );
};
