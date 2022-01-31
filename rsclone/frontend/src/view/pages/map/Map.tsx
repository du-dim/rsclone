/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
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
  const [viewport, setViewport] = useState({
    latitude: 53.9089,
    longitude: 27.5600,
    zoom: 15,
    width: '100%',
    height: '100%',
  });
  return (
    <div className='page'>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxApiAccessToken={REACT_API_MAPBOX}
        onViewportChange={(viewport: IViewport) => setViewport(viewport)}
      >
        <Marker latitude={53.9089} longitude={27.5600}>
          <img src='assets/icons/marker/user.png' alt='' />
        </Marker>

      </ReactMapGL>
    </div>
  );
};
