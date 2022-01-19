import React from 'react';
import { Footer } from './view/footer/Footer';
import { Header } from './view/header/Header';
// import { Main } from './view/main/Main';
import './index.scss';
import { Registration } from './view/registration/Registration';

export const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      {/* <Main /> */}
      {/* <Authorization /> */}
      <Registration />
      <Footer />
    </div>
  );
};
