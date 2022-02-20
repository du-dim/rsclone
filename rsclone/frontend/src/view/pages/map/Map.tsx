/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import dataBelarusbankATM from '../../../data/dataBelarusbankATM.json';
import dataBelarusbankBranch from '../../../data/dataBelarusbankBranch.json';
import dataBelarusbankInfo from '../../../data/dataBelarusbankInfo.json';
import dataBelapb from '../../../data/dataBelapb.json';
import {
  IResultBank, IBelarusbankATM, IBelarusbankInfo, IBelarusbankBranch, IBelapbList,
} from '../../../types/types';
import './map.scss';

interface IViewport {
  latitude: number,
  longitude:number,
  zoom: number,
  width: string,
  height: string,
}

export const Map = () => {
  const REACT_API_MAPBOX = 'pk.eyJ1IjoiZGltLWR1Ym92aWsiLCJhIjoiY2t6MzNlY3FoMDJ1NTJ1b2dkdmg2dnBibyJ9._MxKUpPJFa0mS49n5EW8Ow';
  const [lat, setLat] = useState(53.9089);
  const [long, setLong] = useState(27.5600);
  const [ATM, setATM] = useState<IResultBank[]>([]);
  const [info, setInfo] = useState<IResultBank[]>([]);
  const [branch, setBranch] = useState<IResultBank[]>([]);
  const [belapb, setBelapb] = useState<IResultBank[]>([]);
  const [viewport, setViewport] = useState({
    latitude: 53.9089,
    longitude: 27.5600,
    zoom: 15,
    width: '100%',
    height: '100%',
  });

  const [description, setDescription] = useState<IResultBank | null>(null);

  navigator.geolocation.watchPosition((position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });

  useEffect(() => {
    setViewport({ ...viewport, latitude: lat, longitude: long });
  }, [lat, long]);

  useEffect(() => {
    const dataATM = dataBelarusbankATM as IBelarusbankATM[];
    const dataBranch = dataBelarusbankBranch as IBelarusbankBranch[];
    const dataInfo = dataBelarusbankInfo as IBelarusbankInfo[];
    const belapb = dataBelapb as IBelapbList;
    const dataBranchFilter = dataBranch.filter((obj) => Number(obj.GPS_X) < (viewport.latitude + 0.015) && Number(obj.GPS_X) > (viewport.latitude - 0.015) && Number(obj.GPS_Y) < (viewport.longitude + 0.015) && Number(obj.GPS_Y) > (viewport.longitude - 0.015));
    const dataInfoFilter = dataInfo.filter((obj) => Number(obj.gps_x) < (viewport.latitude + 0.015) && Number(obj.gps_x) > (viewport.latitude - 0.015) && Number(obj.gps_y) < (viewport.longitude + 0.015) && Number(obj.gps_y) > (viewport.longitude - 0.015)) as IBelarusbankInfo[];
    const dataATMFilter = dataATM.filter((obj) => Number(obj.gps_x) < (viewport.latitude + 0.015) && Number(obj.gps_x) > (viewport.latitude - 0.015) && Number(obj.gps_y) < (viewport.longitude + 0.015) && Number(obj.gps_y) > (viewport.longitude - 0.015));
    const dataBelapbFilter = belapb.ExBanksList.Bank.filter((obj) => Number(obj.BankLatitude) < (viewport.latitude + 0.015) && Number(obj.BankLatitude) > (viewport.latitude - 0.015) && Number(obj.BankLongitude) < (viewport.longitude + 0.015) && Number(obj.BankLongitude) > (viewport.longitude - 0.015));
    const dataResultATM = dataATMFilter.map((obj) => Object(
      {
        id: obj.id,
        name: 'Беларусанк, Банкомат',
        adress: `${obj.city_type}${obj.city}, ${obj.address_type}${obj.address}, ${obj.house}`,
        gps: [obj.gps_x, obj.gps_y],
        currency: obj.currency,
        workTime: obj.work_time,
      },
    )) as IResultBank[];

    const dataResultInfo = dataInfoFilter.map((obj) => Object(
      {
        id: obj.info_id.toString(),
        name: 'Беларусанк, Инфокиоск',
        adress: `${obj.city_type}${obj.city}, ${obj.address_type}${obj.address}, ${obj.house}`,
        gps: [obj.gps_x, obj.gps_y],
        currency: obj.currency,
        workTime: obj.work_time,
      },
    )) as IResultBank[];

    const dataResultBranch = dataBranchFilter.map((obj) => Object(
      {
        id: obj.filial_id,
        name: `Беларусанк, ${obj.filial_name}`,
        adress: `${obj.name_type}${obj.name}, ${obj.street_type}${obj.street}, ${obj.home_number}`,
        gps: [obj.GPS_X, obj.GPS_Y],
        currency: '',
        workTime: '',
        phone: obj.phone_info,
      },
    )) as IResultBank[];

    const dataResultBelapb = dataBelapbFilter.map((obj) => Object(
      {
        id: obj.Id,
        name: `Белагропромбанк ${obj.BankType},\n${obj.BankTitleRu}`,
        adress: `${obj.BankAddressRu}`,
        gps: [obj.BankLatitude, obj.BankLongitude],
        currency: '',
        workTime: '',
        phone: typeof obj.BankPhone === 'object' ? '' : obj.BankPhone,
      },
    )) as IResultBank[];

    setATM(dataResultATM);
    setInfo(dataResultInfo);
    setBranch(dataResultBranch);
    setBelapb(dataResultBelapb);
  }, [viewport]);

  return (
    <div className='page-map'>
      <div className='description'>
        <div className='description__item'>{description?.name}</div>
        <div className='description__item'>{description?.adress ? `Адрес: ${description.adress}` : ''}</div>
        <div className='description__item'>{description?.currency ? `Валюта: ${description.currency}` : ''}</div>
        <div className='description__item'>{description?.workTime ? `Время работы: ${description.workTime}` : ''}</div>
        <div className='description__item'>{description?.phone ? `тел: ${description.phone}` : ''}</div>
      </div>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxApiAccessToken={REACT_API_MAPBOX}
        onViewportChange={(viewport: IViewport) => { setViewport(viewport); setDescription(null); }}
      >
        <Marker latitude={lat} longitude={long}>
          <img src='assets/icons/marker/user.png' alt='' />
        </Marker>
        {ATM.map((el) => (
          <Marker latitude={Number(el.gps[0])} longitude={Number(el.gps[1])} key={`belarusbank${el.id}`} onClick={() => setDescription(el)}>
            <img src='assets/icons/marker/ATM-Belarusbank.svg' alt='marker' />
          </Marker>
        ))}
        {branch.map((el) => (
          <Marker latitude={Number(el.gps[0])} longitude={Number(el.gps[1])} key={`belarusbank${el.id}`} onClick={() => setDescription(el)}>
            <img src='assets/icons/marker/branch-Belarusbank.svg' alt='marker' />
          </Marker>
        ))}
        {info.map((el) => (
          <Marker latitude={Number(el.gps[0])} longitude={Number(el.gps[1])} key={`belarusbank${el.id}`} onClick={() => setDescription(el)}>
            <img src='assets/icons/marker/info-Belarusbank.svg' alt='marker' />
          </Marker>
        ))}
        {belapb.map((el) => (
          <Marker latitude={Number(el.gps[0])} longitude={Number(el.gps[1])} key={`belapb${el.id}`} onClick={() => setDescription(el)}>
            <img
              src={el.name.includes('Банкомат') ? 'assets/icons/marker/ATM-Belagroprombank.svg'
                : el.name.includes('Инфокиоск') ? 'assets/icons/marker/info-Belagroprombank.svg'
                  : 'assets/icons/marker/branch-Belagroprombank.svg'}
              alt='marker'
            />
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};
