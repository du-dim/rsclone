/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Authorization } from './view/pages/authorization/Authorization';
import { Registration } from './view/pages/registration/Registration';
import { Home } from './view/pages/home/Home';
import { Accounts } from './view/pages/accounts/Accounts';
import { Categories } from './view/pages/categories/Categories';
import { Currencies } from './view/pages/currencies/Currencies';
import { Banks } from './view/pages/banks/Banks';
import { Statistics } from './view/pages/statistics/Statistics';
import { Info } from './view/pages/info/Info';
import { Calculator } from './view/pages/calculator/Calculator';
import { Converter } from './view/pages/converter/Converter';
import { Schedule } from './view/pages/schedule/Schedule';
import { Sort } from './view/pages/sort/Sort';
import { Map } from './view/pages/map/Map';
import { AddBalans } from './view/pages/addBalans/AddBalans';
import { SubBalans } from './view/pages/subBalans/SubBalans';
import { AddCategories } from './view/pages/addCategories/AddCategories';
import { SubCategories } from './view/pages/subCategories/SubCategories';
import { bynObj } from './data/const';
import { IBody, ICurrent, TCurrency } from './types/types';

export const useRoutes = (isAuth: boolean) => {
  const BASE_URL = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';
  const [capital, setCapital] = useState(0);
  const [userId, setUserId] = useState('');
  const [dataBase, setDataBase] = useState<IBody[]>([]);
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const storageExpense = localStorage.getItem('activExpense');
  const storageIncome = localStorage.getItem('activIncome');
  const [activExpense, setActivExpense] = useState<boolean[]>(storageExpense ? JSON.parse(storageExpense) as boolean[] : Array(12).fill(true));
  const [activIncome, setActivIncome] = useState<boolean[]>(storageIncome ? JSON.parse(storageIncome) as boolean[] : Array(5).fill(true));
  const [currency, setCurrency] = useState<TCurrency>('BYN');
  const [todayCurrency, setTodayCurrency] = useState<ICurrent[]>([]);

  const dataBalans = async () => {
    const user = localStorage.getItem('userId') as string;
    setUserId(user);
    if (isAuth && localStorage.getItem('userId')) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
        }),
      };
      try {
        const response = await fetch('/databalans', requestOptions);
        const data = await response.json() as IBody[];
        if (response.ok) {
          setDataBase(data);
        } else console.log('Something went wrong');
      } catch (e) {
        console.log('Something went wrong');
      }
    } else console.log('none');
  };

  useEffect(() => {
    if (localStorage.getItem('saveCurrency')) {
      const saveCurrency = localStorage.getItem('saveCurrency') as TCurrency;
      setCurrency(saveCurrency);
    }
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data:ICurrent[]) => {
        sessionStorage.setItem('dataCurrency', JSON.stringify(data));
        setTodayCurrency([bynObj, ...data]);
      });
  }, []);

  useEffect(() => {
    dataBalans();
  }, [userId]);

  useEffect(() => {
    const arrCurrency = [] as TCurrency[];
    setExpense('');
    setIncome('');
    if (dataBase.length > 0) {
      dataBase.forEach((obj) => {
        if (!arrCurrency.length) arrCurrency.push(obj.currency);
        if (!arrCurrency.includes(obj.currency)) arrCurrency.push(obj.currency);
      });
      const arrSum = arrCurrency.map((c) => dataBase.filter((obj) => obj.currency === c).map((obj) => obj.amount).reduce((a, b) => a + b));
      if (todayCurrency.length) {
        const entries = todayCurrency.map((obj) => [obj.Cur_Abbreviation, Math.round((obj.Cur_OfficialRate * 10000) / obj.Cur_Scale) / 10000]);
        const objCurrensyToday = Object.fromEntries(entries);
        const sum = arrSum.map((s, i) => (s * objCurrensyToday[arrCurrency[i]]) / objCurrensyToday[currency]).reduce((a, b) => a + b);
        setCapital(Math.round(sum * 100) / 100);
      }
    }
  }, [dataBase, currency]);

  useEffect(() => {
    setActivExpense(activExpense);
    setActivIncome(activIncome);
    localStorage.setItem('activExpense', JSON.stringify(activExpense));
    localStorage.setItem('activIncome', JSON.stringify(activIncome));
  }, [activExpense, activIncome]);

  return (
    isAuth ? (
      <Routes>
        <Route path='home' element={<Home sum={capital} currency={currency} />} />
        <Route path='Accounts' element={<Accounts />} />
        <Route
          path='Categories'
          element={(
            <Categories
              arrExpense={activExpense}
              arrIncome={activIncome}
              setArrExpense={setActivExpense}
              setArrIncome={setActivIncome}
            />
          )}
        />
        <Route path='Currency' element={<Currencies setCurrency={setCurrency} />} />
        <Route path='Banks' element={<Banks />} />
        <Route path='Statistics/*' element={<Statistics dataChart={dataBase} />} />
        <Route path='Info' element={<Info />} />
        <Route path='calculator' element={<Calculator />} />
        <Route path='converter' element={<Converter />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='sorts/*' element={<Sort dataInfo={dataBase} />} />
        <Route path='map' element={<Map />} />
        <Route path='addBalans' element={<AddBalans name={income} setData={setDataBase} />} />
        <Route path='subBalans' element={<SubBalans name={expense} setData={setDataBase} />} />
        <Route path='addCategories' element={<AddCategories setName={setIncome} arrIncome={activIncome} />} />
        <Route path='subCategories' element={<SubCategories setName={setExpense} arrExpense={activExpense} />} />
        <Route path='*' element={<Navigate to='home' />} />
      </Routes>
    ) : (
      <Routes>
        <Route path='auth/login' element={<Authorization setId={setUserId} />} />
        <Route path='auth/register' element={<Registration />} />
        <Route path='*' element={<Navigate to='auth/login' />} />
      </Routes>
    )
  );
};
