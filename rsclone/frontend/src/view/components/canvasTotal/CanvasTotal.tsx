/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import { IBody, IData } from '../../../types/types';
import './canvasTotal.scss';

type IProps = {
  dataChart: IBody[],
  dateStart: string,
  dateEnd: string,
}

export const CanvasTotal = ({
  dataChart, dateStart, dateEnd,
}: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const width = 320;
  const height = 200;

  const widthCanv = width * 4;
  const heightCanv = height * 4;
  useEffect(() => {
    const dataCapital = dataChart.map((obj) => obj.amount);
    const capitalLimit = dataCapital.map((el, i, arr) => Array(i + 1).fill(0).map((_, j) => arr[j]).reduce((a, b) => a + b));
    const newData = dataChart.map((obj, i) => [Number(obj.date.split('T')[0].replace(/-/g, '')), capitalLimit[i], obj.amount]);

    const numDateStart = Number(dateStart.replace(/-/g, ''));
    const numDateEnd = Number(dateEnd.replace(/-/g, ''));
    const dataTotal = newData.filter((obj) => obj[0] <= numDateEnd).filter((obj) => obj[0] >= numDateStart);

    if (dataTotal.length > 1) {
      const setepX = (widthCanv - 100) / (dataTotal.length - 1);
      const amountLimit = dataTotal.map((obj) => obj[1]);
      const maxY = Math.max.apply(null, amountLimit);
      const minY = Math.min.apply(null, amountLimit);
      const fieldY = maxY - minY;
      const data = amountLimit.map((el, i) => [setepX * i, ((heightCanv - 300) * (el - minY)) / fieldY]);

      if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d');
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
        canvasRef.current.width = widthCanv;
        canvasRef.current.height = heightCanv;

        const ctx = canvasCtxRef.current;
        ctx?.clearRect(0, 0, widthCanv, heightCanv);

        ctx!.font = '60px Arial';
        ctx!.fillText('Expense', widthCanv / 2 + 180, 75);
        ctx!.fillText('Income', widthCanv / 2 - 250, 75);

        ctx!.font = '50px Arial';
        ctx!.fillStyle = '#3881e1';
        ctx!.fillText(`Start: ${amountLimit[0]} USD`, 50, heightCanv - 25);
        ctx!.fillText(`End: ${amountLimit[amountLimit.length - 1]} USD`, widthCanv / 2 + 150, heightCanv - 25);

        ctx!.fillStyle = '#f31167';
        ctx!.fillRect(widthCanv / 2 + 80, 40, 80, 30);
        ctx!.fillStyle = '#319c4c';
        ctx!.fillRect(widthCanv / 2 - 350, 40, 80, 30);

        ctx!.fillStyle = '#f6f7f8';
        ctx!.fillRect(50, 100, widthCanv - 100, heightCanv - 200);

        ctx!.beginPath();
        ctx!.lineWidth = 3;
        for (let index = 1; index < 7; index += 1) {
          ctx!.strokeStyle = '#7b858f';
          ctx!.moveTo(50, 50 + index * 100);
          ctx!.lineTo(widthCanv - 50, 50 + index * 100);
        }
        ctx!.stroke();

        ctx!.beginPath();
        ctx!.strokeStyle = '#3881e1';
        ctx!.lineWidth = 8;
        ctx!.moveTo(data[0][0] + 50, heightCanv - 150 - data[0][1]);
        data.forEach((d) => {
          ctx!.lineTo(d[0] + 50, heightCanv - 150 - d[1]);
        });
        ctx!.stroke();

        data.forEach((d, i) => {
          ctx!.beginPath();
          ctx!.lineWidth = 4;
          ctx!.strokeStyle = dataTotal[i][2] < 0 ? '#ffbdd6' : '#5fe380';
          ctx!.moveTo(d[0] + 50, heightCanv - 150);
          ctx!.lineTo(d[0] + 50, heightCanv - 150 - d[1]);
          ctx!.stroke();
        });

        data.forEach((d, i) => {
          ctx!.beginPath();
          ctx!.lineWidth = 10;
          ctx!.strokeStyle = dataTotal[i][2] < 0 ? '#f31167' : '#319c4c';
          ctx!.arc(d[0] + 50, heightCanv - 150 - d[1], 6, 0, 2 * Math.PI);
          ctx!.stroke();
        });
      }
    } else if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      canvasRef.current.width = widthCanv;
      canvasRef.current.height = heightCanv;

      const ctx = canvasCtxRef.current;
      ctx?.clearRect(0, 0, widthCanv, heightCanv);
        ctx!.fillStyle = '#f6f7f8';
        ctx!.fillRect(0, 0, widthCanv, heightCanv);
        for (let index = 1; index < 7; index += 1) {
          ctx!.beginPath();
          ctx!.lineWidth = 2;
          ctx!.strokeStyle = '#7b858f';
          ctx!.moveTo(40, index * 100);
          ctx!.lineTo(widthCanv, index * 100);
          ctx!.stroke();
        }
    }
  }, [dataChart, dateStart, dateEnd]);
  return (
    <div className='chart-total'>
      <div className='chart-total_title'>Chart Capital</div>
      <canvas ref={canvasRef} />
    </div>
  );
};
