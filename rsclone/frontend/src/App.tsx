import React from 'react';
import { Footer } from './view/footer/Footer';
import { Header } from './view/header/Header';
// import { Main } from './view/main/Main';
import './index.scss';
import { Authorization } from './view/authorization/Authorization';

export const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      {/* <Main /> */}
      <Authorization />
      <Footer />
    </div>
  );
};
