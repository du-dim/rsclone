import React from 'react';
import { Main } from './main/Main';
import { Footer } from './view/footer/Footer';
import { Header } from './view/header/Header';

export const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
