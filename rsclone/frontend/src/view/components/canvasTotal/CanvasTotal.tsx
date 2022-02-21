/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import { IBody, TCurrency } from '../../../types/types';
import './canvasTotal.scss';

type IProps = {
  dataChart: IBody[],
  dateStart: string,
  dateEnd: string,
  currency: TCurrency,
}

export const CanvasTotal = ({
  dataChart, dateStart, dateEnd, currency,
}: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [touchX, setTouchX] = useState(0);
  const [details, setDetails] = useState({
    num: 0,
    date: '',
    type: '',
    category: '',
    amount: 0,
    currency: '',
    balans: 0,
    note: '',
  });
  const [arrow, setArrow] = useState(0);

  function arrowLeft() {
    setArrow(arrow - 1);
  }

  function arrowRight() {
    setArrow(arrow + 1);
  }

  function touchEvent(e:React.TouchEvent<HTMLCanvasElement>) {
    setTouchX(e.touches[0].clientX);
    setArrow(0);
  }

  useEffect(() => {
    const dataCapital = dataChart.map((obj) => obj.amount);
    const capitalLimit = dataCapital.map((el, i, arr) => Array(i + 1).fill(0).map((_, j) => arr[j]).reduce((a, b) => a + b));
    const newData = dataChart.map((obj, i) => [Number(obj.date.split('T')[0].replace(/-/g, '')), capitalLimit[i], obj.amount, i]);

    const numDateStart = Number(dateStart.replace(/-/g, ''));
    const numDateEnd = Number(dateEnd.replace(/-/g, ''));
    const dataBefore = newData.filter((obj) => obj[0] < numDateStart);
    const dataBetween = newData.filter((obj) => obj[0] <= numDateEnd).filter((obj) => obj[0] >= numDateStart);
    let dataTotal: number[][];
    if (dataBefore.length) {
      dataTotal = [dataBefore[dataBefore.length - 1]].concat(dataBetween);
    } else {
      dataTotal = [[0, 0, 0, 0]].concat(dataBetween);
    }
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
        const widthCanv = width * 4;
        const heightCanv = height * 4;
        let lineX: number;

        const stepX = (widthCanv - 100) / (dataTotal.length - 1);

        if (touchX <= (left + 12.5)) {
          lineX = 51;
          setTouchX(left + 12.55);
        } else if (touchX >= (right - 12.5)) {
          lineX = widthCanv - 51;
          setTouchX(right - 12.55);
        } else {
          lineX = touchX * 4 - left * 4 + arrow * stepX;
        }

        const dh = heightCanv / 8;
        const data = amountLimit.map((el, i) => [stepX * i + 50, heightCanv - 1.5 * dh - ((heightCanv - 3 * dh) * (el - minY)) / fieldY]);
        if (lineX > data[data.length - 1][0]) {
          setArrow(arrow - 1);
          lineX -= stepX;
        }
        if (lineX < data[0][0]) {
          setArrow(arrow + 1);
          lineX += stepX;
        }

        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
        canvasRef.current.width = widthCanv;
        canvasRef.current.height = heightCanv;
        const ctx = canvasCtxRef.current;
        ctx?.clearRect(0, 0, widthCanv, heightCanv);

        ctx!.font = '60px Patrick Hand';
        ctx!.fillText('Expense', widthCanv / 2 + 180, (3 * dh) / 4);
        ctx!.fillText('Income', widthCanv / 2 - 250, (3 * dh) / 4);

        ctx!.font = '60px Patrick Hand';
        ctx!.fillStyle = '#3881e1';
        ctx!.fillText(`Start: ${amountLimit[1]} USD`, 50, heightCanv - dh / 3);
        const dws = 12 * amountLimit[amountLimit.length - 1].toString().length;
        ctx!.fillText(`End: ${amountLimit[amountLimit.length - 1]} USD`, widthCanv - 300 - dws, heightCanv - dh / 3);

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
          ctx!.strokeStyle = '#352f2f';
          ctx!.lineWidth = 8;
          ctx!.moveTo(lineX, dh);
          ctx!.lineTo(lineX, heightCanv - dh);
          ctx!.stroke();
          ctx!.beginPath();
          const indexP = Math.ceil((lineX - 50) / stepX) - 1;
          const index = dataTotal[indexP + 1][3];
          setDetails({
            num: indexP + 1,
            date: dataChart[index].date.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}:\d{2}).(\d{3}Z)/, '$3-$2-$1/$4'),
            type: dataTotal[indexP + 1][2] < 0 ? 'expense' : 'income',
            category: dataChart[index].category,
            amount: dataChart[index].amount,
            currency: dataChart[index].currency,
            balans: dataTotal[indexP + 1][1],
            note: dataChart[index].note,
          });

          const lineY = ((data[indexP + 1][1] - data[indexP][1]) * (lineX - data[indexP][0])) / stepX + data[indexP][1];

          ctx!.beginPath();
          ctx!.lineWidth = 20;
          ctx!.strokeStyle = '#f6f7f8';
          ctx!.arc(lineX, lineY, 12, 0, 2 * Math.PI);
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.lineWidth = 8;
          ctx!.strokeStyle = '#352f2f';
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
          ctx!.lineWidth = 12;
          ctx!.strokeStyle = dataTotal[i][2] < 0 ? '#f31167' : '#319c4c';
          ctx!.arc(d[0], d[1], 6, 0, 2 * Math.PI);
          ctx!.stroke();
        });
      }
    }
  }, [dataChart, dateStart, dateEnd, touchX, arrow]);
  return (
    <div className='chart-total'>
      <div className='chart-total_title'>Chart Balans</div>
      <canvas
        ref={canvasRef}
        onTouchMove={(e) => touchEvent(e)}
        onTouchStart={(e) => touchEvent(e)}
      />
      <div className='chart-total__arrow'>
        <div className='chart-total__arrow_btn' onClick={() => arrowLeft()}>
          <img src='/assets/icons/arrow-left.svg' alt='left' />
        </div>
        <div className='chart-total__arrow_btn' onClick={() => arrowRight()}>
          <img src='/assets/icons/arrow-right.svg' alt='right' />
        </div>
      </div>
      <div className='title'>Operation Details</div>
      <div className='chart-total__info'>
        <div className='chart-total__info_item'>
          <div className='chart-total__info_item-title'>{`№${!details.num ? '' : details.num}`}</div>
        </div>
        <div className='chart-total__info_item'>
          <div className='chart-total__info_item-title'>1. Date/Time:</div>
          <div className='chart-total__info_item-context'>{details.date}</div>
        </div>
        <div className='chart-total__info_item'>
          <div className='chart-total__info_item-title'>2. Type:</div>
          <div className='chart-total__info_item-context'>{details.type}</div>
        </div>
        <div className='chart-total__info_item'>
          <div className='chart-total__info_item-title'>3. Category:</div>
          <div className='chart-total__info_item-context'>{details.category}</div>
        </div>
        <div className='chart-total__info_item'>
          <div className='chart-total__info_item-title'>4. Transaction amount:</div>
          <div className='chart-total__info_item-context'>{!details.num ? '' : `${details.amount} ${details.currency}`}</div>
        </div>
        <div className='chart-total__info_item'>
          <div className='chart-total__info_item-title'>5. Total balans:</div>
          <div className='chart-total__info_item-context'>{!details.num ? '' : `${details.balans}USD`}</div>
        </div>
        <div className='chart-total__info_item'>
          <div className='chart-total__info_item-title'>6. Note:</div>
          <div className='chart-total__info_item-context'>{details.note === '-' ? '' : details.note}</div>
        </div>
      </div>
    </div>
  );
};
