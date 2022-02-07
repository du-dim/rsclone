/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import './statistics.scss';

interface IData {
  color: string,
  amount: number,
  percent: number,
  startAngle: number,
  endAngle: number,
}

export const Statistics = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const expenseArr = ['bills', 'car', 'clothes', 'phone', 'entertainment', 'food', 'gifts', 'health', 'house', 'pets', 'transport', 'sports'];
  const colors = ['#ff867d', '#c4de40', '#65ccaf', '#529bfa', '#ff5c9a', '#44c8d7', '#e6bf6c', '#e8ebed', '#5e6a75', '#d1cbcc', '#ff7e7e', '#a88ae6', '#8483e6', '#40a0ff', '#a7e05c', '#ffbc63', '#ff9b69'];
  const [dataArr, setDataArr] = useState([10, 10, 10, 20, 56, 40]);
  const sum = dataArr.reduce((a, b) => a + b);
  const percent = dataArr.map((el) => (100 * el) / sum);
  const percentSum = percent.map((el, i, arr) => Array(i + 1).fill(0).map((_, j) => arr[j]).reduce((a, b) => a + b));
  const endAngle = percentSum.map((el) => (Math.PI * el) / 50);
  const startAngle = endAngle.map((el, i, arr) => (i === 0 ? Math.PI / 90 : arr[i - 1] + Math.PI / 90));
  const data = [] as IData[];
  for (let index = 0; index < dataArr.length; index += 1) {
    data.push({
      color: colors[index],
      amount: dataArr[index],
      percent: percent[index],
      startAngle: startAngle[index],
      endAngle: endAngle[index],
    });
  }

  const width = 300;
  const height = 250;

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;
      ctx!.font = '30px Arial';
      ctx!.fillText(`${123}`, width / 2 - 27, height / 2 + 12, 80);
      ctx!.lineWidth = 2;
      ctx!.strokeStyle = '#ffbdd6';
      ctx!.beginPath();
      ctx!.arc(width / 2, height / 2, height / 4 - 15, 0, 2 * Math.PI);
      ctx!.stroke();
      data.forEach((el) => {
        ctx!.lineWidth = 15;
        ctx!.strokeStyle = el.color;
        ctx!.beginPath();
        ctx!.lineWidth = 20;
        ctx!.arc(width / 2, height / 2, height / 4, el.startAngle, el.endAngle);
        ctx!.stroke();
      });
      data.forEach((el) => {
        ctx!.lineWidth = 30;
        const middle = (el.startAngle + el.endAngle) / 2;
        ctx!.strokeStyle = el.color;
        ctx!.beginPath();
        ctx!.arc(width / 2, height / 2, height / 3, middle, middle + Math.PI / 120);
        ctx!.stroke();
      });

      data.forEach((el, i) => {
        const middle = (el.startAngle + el.endAngle) / 2;
        const r = height / 3 + 26;
        const x = width / 2 + r * Math.cos((middle));
        const y = height / 2 + r * Math.sin((middle));
        ctx!.strokeStyle = el.color;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.arc(x, y, 12, 0, 2 * Math.PI);
        ctx!.stroke();
        ctx!.font = '14px Arial';
        if (i < 11) {
          ctx!.fillText(`${i + 1}`, x - 4, y + 5);
        } else ctx!.fillText(`${i + 1}`, x - 8, y + 5);
      });
    }
  }, []);

  return (
    <div className='page-statistics'>
      <h2>Statistics</h2>
      <div className='date'>
        <div className='date__field'>
          <div className='date__field_start'>
            <div className='date__field_end title'>Start date</div>
            <input className='date__field_start input' type='date' name='' id='' />
          </div>
          <div className='date__field_end'>
            <div className='date__field_end title'>End date</div>
            <input className='date__field_end input' type='date' name='' id='' />
          </div>
        </div>
      </div>
      <div className='chart'>
        <h3>Chart expense</h3>
        <canvas ref={canvasRef} width={width} height={height} />
        <div className='category'>
          {expenseArr.map((el, index) => (
            <div
              className='category__item'
              key={`expense_${el}`}
            >
              <p className='category__item_text'>{`${index + 1}. ${el}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
