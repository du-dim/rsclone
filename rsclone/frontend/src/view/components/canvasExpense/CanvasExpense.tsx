/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import { IBody, IData } from '../../../types/types';
import './canvasExpense.scss';

type IProps = {
  dataChart: IBody[],
  dateStart: string,
  dateEnd: string,
}

export const CanvasExpense = ({
  dataChart, dateStart, dateEnd,
}: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const colors = ['#ff867d', '#c4de40', '#65ccaf', '#529bfa', '#ff5c9a', '#44c8d7', '#e6bf6c', '#e8ebed', '#5e6a75', '#d1cbcc', '#ff7e7e', '#a88ae6', '#8483e6', '#40a0ff', '#a7e05c', '#ffbc63', '#ff9b69'];
  const [categoriesExpense, setCategoriesExpense] = useState<string[]>([]);
  const [data, setData] = useState<IData[]>([]);
  const width = 300;
  const height = 250;
  useEffect(() => {
    const categoriesExpenseEffect = [] as string[];
    const dataEffect = [] as IData[];
    const numDateStart = Number(dateStart.replace(/-/g, ''));
    const numDateEnd = Number(dateEnd.replace(/-/g, ''));

    const dataExpense = dataChart
      .filter((obj) => obj.amount < 0)
      .filter((obj) => Number(obj.date.split('T')[0].replace(/-/g, '')) <= numDateEnd)
      .filter((obj) => Number(obj.date.split('T')[0].replace(/-/g, '')) >= numDateStart);

    if (dataExpense.length) {
      dataExpense.forEach((obj) => {
        if (!categoriesExpenseEffect.length) categoriesExpenseEffect.push(obj.category);
        if (!categoriesExpenseEffect.includes(obj.category)) categoriesExpenseEffect.push(obj.category);
      });
      setCategoriesExpense(categoriesExpenseEffect);
      const amountExpense = categoriesExpenseEffect.map((cat) => dataExpense.filter((obj) => obj.category === cat).map((el) => Math.abs(el.amount)).reduce((a, b) => a + b));
      const sumExpense = amountExpense.reduce((a, b) => a + b);
      const percent = amountExpense.map((el) => (100 * el) / sumExpense);
      const percentSum = percent.map((el, i, arr) => Array(i + 1).fill(0).map((_, j) => arr[j]).reduce((a, b) => a + b));
      const endAngle = percentSum.map((el) => (Math.PI * el) / 50);
      const startAngle = endAngle.map((el, i, arr) => (i === 0 ? Math.PI / 90 : arr[i - 1] + Math.PI / 90));
      for (let index = 0; index < amountExpense.length; index += 1) {
        dataEffect.push({
          color: colors[index],
          amount: amountExpense[index],
          percent: percent[index],
          startAngle: startAngle[index],
          endAngle: endAngle[index],
        });
      }
      setData(dataEffect);
      if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d');
        const ctx = canvasCtxRef.current;
        ctx?.clearRect(0, 0, width, height);
        ctx!.font = '30px Arial';
        const dw = sumExpense.toString().length * 9;
        ctx!.fillText(`${sumExpense}`, width / 2 - dw, height / 2 + 12, 80);
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = '#ffbdd6';
        ctx!.beginPath();
        ctx!.arc(width / 2, height / 2, height / 4 - 15, 0, 2 * Math.PI);
        ctx!.stroke();
        dataEffect.forEach((el) => {
          ctx!.lineWidth = 15;
          ctx!.strokeStyle = el.color;
          ctx!.beginPath();
          ctx!.lineWidth = 20;
          ctx!.arc(width / 2, height / 2, height / 4, el.startAngle, el.endAngle);
          ctx!.stroke();
        });
        dataEffect.forEach((el) => {
          ctx!.lineWidth = 30;
          const middle = (el.startAngle + el.endAngle) / 2;
          ctx!.strokeStyle = el.color;
          ctx!.beginPath();
          ctx!.arc(width / 2, height / 2, height / 3, middle, middle + Math.PI / 120);
          ctx!.stroke();
        });

        dataEffect.forEach((el, i) => {
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
    } else if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;
      ctx?.clearRect(0, 0, width, height);
      ctx!.font = '30px Arial';
      ctx!.fillText(`${0}`, width / 2 - 9, height / 2 + 12, 80);
      ctx!.lineWidth = 2;
      ctx!.strokeStyle = '#ffbdd6';
      ctx!.beginPath();
      ctx!.arc(width / 2, height / 2, height / 4 - 15, 0, 2 * Math.PI);
      ctx!.stroke();
      setCategoriesExpense([]);
      setData([]);
    }
  }, [dataChart, dateStart, dateEnd]);
  return (
    <div className='chart'>
      <div className='chart_title'>Chart expense</div>
      <canvas ref={canvasRef} width={width} height={height} />
      <div className='category'>
        {categoriesExpense.map((el, index) => (
          <div
            className='category__item'
            style={{ backgroundColor: colors[index] }}
            key={`expense_${el}`}
          >
            <p className='category__item_text'>{`${index + 1}. ${el}`}</p>
            <p className='category__item_text'>{`${Math.round(data[index].percent)}% -> ${data[index].amount} USD`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
