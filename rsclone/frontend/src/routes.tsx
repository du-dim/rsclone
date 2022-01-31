import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Authorization } from './view/pages/authorization/Authorization';
import { Registration } from './view/pages/registration/Registration';
import { Home } from './view/pages/home/Home';
import { Accounts } from './view/pages/accounts/Accounts';
import { Categories } from './view/pages/categories/Categories';
import { Currencies } from './view/pages/currencies/Currencies';
import { Peminders } from './view/pages/peminders/Peminders';
import { Statistics } from './view/pages/statistics/Statistics';
import { Info } from './view/pages/info/Info';
import { Calculator } from './view/pages/calculator/Calculator';
import { Converter } from './view/pages/converter/Converter';
import { Schedule } from './view/pages/schedule/Schedule';
import { Sort } from './view/pages/sort/Sort';
import { Map } from './view/pages/map/Map';
import { AddBalans } from './view/pages/addBalans/AddBalans';
import { SubBalans } from './view/pages/subBalans/SubBalans';

export const useRoutes = (isAuth: boolean) => {
  return (
    isAuth ? (
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='Accounts' element={<Accounts />} />
        <Route path='Categories' element={<Categories />} />
        <Route path='Currencies' element={<Currencies />} />
        <Route path='Peminders' element={<Peminders />} />
        <Route path='Statistics' element={<Statistics />} />
        <Route path='Info' element={<Info />} />
        <Route path='calculator' element={<Calculator />} />
        <Route path='converter' element={<Converter />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='sorts' element={<Sort />} />
        <Route path='map' element={<Map />} />
        <Route path='addBalans' element={<AddBalans />} />
        <Route path='subBalans' element={<SubBalans />} />
        <Route path='*' element={<Navigate to='home' />} />
      </Routes>
    ) : (
      <Routes>
        <Route path='auth/login' element={<Authorization />} />
        <Route path='auth/register' element={<Registration />} />
        <Route path='*' element={<Navigate to='auth/login' />} />
      </Routes>
    )
  );
};
