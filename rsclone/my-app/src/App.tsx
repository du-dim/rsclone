import React from 'react';
import { Footer } from './view/footer/Footer';
import { Header } from './view/header/Header';
import { Main } from './view/main/Main';

export const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
