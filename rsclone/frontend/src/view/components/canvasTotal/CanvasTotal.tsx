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
  const [touchX, setTouchX] = useState(0);
  useEffect(() => {
    const dataCapital = dataChart.map((obj) => obj.amount);
    const capitalLimit = dataCapital.map((el, i, arr) => Array(i + 1).fill(0).map((_, j) => arr[j]).reduce((a, b) => a + b));
    const newData = dataChart.map((obj, i) => [Number(obj.date.split('T')[0].replace(/-/g, '')), capitalLimit[i], obj.amount]);

    const numDateStart = Number(dateStart.replace(/-/g, ''));
    const numDateEnd = Number(dateEnd.replace(/-/g, ''));
    const dataTotal = newData.filter((obj) => obj[0] <= numDateEnd).filter((obj) => obj[0] >= numDateStart);

    const amountLimit = dataTotal.map((obj) => obj[1]);
    const maxY = Math.max.apply(null, amountLimit);
    const minY = Math.min.apply(null, amountLimit);
    const fieldY = maxY - minY;
    if (dataTotal.length > 1) {
      if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d');
        const canvas = canvasRef.current.getBoundingClientRect();
        const { width } = canvas;
        const { height } = canvas;
        const { left } = canvas;
        const { right } = canvas;
        const lineX = touchX * 4 - left * 4;

        const widthCanv = width * 4;
        const heightCanv = height * 4;
        const dh = heightCanv / 8;
        const stepX = (widthCanv - 100) / (dataTotal.length - 1);
        const data = amountLimit.map((el, i) => [stepX * i + 50, heightCanv - 1.5 * dh - ((heightCanv - 3 * dh) * (el - minY)) / fieldY]);

        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
        canvasRef.current.width = widthCanv;
        canvasRef.current.height = heightCanv;
        const ctx = canvasCtxRef.current;
        ctx?.clearRect(0, 0, widthCanv, heightCanv);

        ctx!.font = '60px Arial';
        ctx!.fillText('Expense', widthCanv / 2 + 180, (3 * dh) / 4);
        ctx!.fillText('Income', widthCanv / 2 - 250, (3 * dh) / 4);

        ctx!.font = '50px Arial';
        ctx!.fillStyle = '#3881e1';
        ctx!.fillText(`Start: ${amountLimit[0]} USD`, 50, heightCanv - dh / 2);
        ctx!.fillText(`End: ${amountLimit[amountLimit.length - 1]} USD`, widthCanv / 2 + 150, heightCanv - dh / 2);

        ctx!.fillStyle = '#f31167';
        ctx!.fillRect(widthCanv / 2 + 80, dh / 2, 80, 30);
        ctx!.fillStyle = '#319c4c';
        ctx!.fillRect(widthCanv / 2 - 350, dh / 2, 80, 30);

        ctx!.fillStyle = '#f6f7f8';
        ctx!.fillRect(50, dh, widthCanv - 100, heightCanv - 2 * dh);

        ctx!.beginPath();
        ctx!.lineWidth = 3;
        for (let index = 1; index < 7; index += 1) {
          ctx!.strokeStyle = '#7b858f';
          ctx!.moveTo(50, dh / 2 + index * dh);
          ctx!.lineTo(widthCanv - 50, dh / 2 + index * dh);
        }
        ctx!.stroke();

        data.forEach((d, i) => {
          ctx!.beginPath();
          ctx!.lineWidth = 4;
          ctx!.strokeStyle = dataTotal[i][2] < 0 ? '#ffbdd6' : '#5fe380';
          ctx!.moveTo(d[0], heightCanv - 1.5 * dh);
          ctx!.lineTo(d[0], d[1]);
          ctx!.stroke();
        });

        if (touchX > (left + 12.5) && touchX < (right - 12.5)) {
          ctx!.beginPath();
          ctx!.strokeStyle = '#8c7266';
          ctx!.lineWidth = 8;
          ctx!.moveTo(lineX, dh);
          ctx!.lineTo(lineX, heightCanv - dh);
          ctx!.stroke();
          ctx!.beginPath();
          const indexP = Math.ceil((lineX - 50) / stepX) - 1;
          const lineY = ((data[indexP + 1][1] - data[indexP][1]) * (lineX - data[indexP][0])) / stepX + data[indexP][1];

          ctx!.beginPath();
          ctx!.lineWidth = 20;
          ctx!.strokeStyle = '#f6f7f8';
          ctx!.arc(lineX, lineY, 12, 0, 2 * Math.PI);
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.lineWidth = 8;
          ctx!.strokeStyle = '#8c7266';
          ctx!.arc(lineX, lineY, 16, 0, 2 * Math.PI);
          ctx!.stroke();
        }

        ctx!.beginPath();
        ctx!.strokeStyle = '#3881e1';
        ctx!.lineWidth = 8;
        ctx!.moveTo(data[0][0], data[0][1]);
        data.forEach((d) => {
          ctx!.lineTo(d[0], d[1]);
        });
        ctx!.stroke();

        data.forEach((d, i) => {
          ctx!.beginPath();
          ctx!.lineWidth = 10;
          ctx!.strokeStyle = dataTotal[i][2] < 0 ? '#f31167' : '#319c4c';
          ctx!.arc(d[0], d[1], 6, 0, 2 * Math.PI);
          ctx!.stroke();
        });
      }
    }
  }, [dataChart, dateStart, dateEnd, touchX]);
  return (
    <div className='chart-total'>
      <div className='chart-total_title'>Chart Capital</div>
      <canvas
        ref={canvasRef}
        onTouchMove={(e) => setTouchX(e.touches[0].clientX)}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      />
    </div>
  );
};
