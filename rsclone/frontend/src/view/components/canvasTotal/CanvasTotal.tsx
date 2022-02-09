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
  const colors = ['#ff867d', '#8ea618', '#65ccaf', '#529bfa', '#ff5c9a', '#44c8d7', '#e6bf6c', '#e8ebed', '#5e6a75', '#d1cbcc', '#ff7e7e', '#a88ae6', '#8483e6', '#40a0ff', '#a7e05c', '#ffbc63', '#ff9b69'];
  const [data, setData] = useState<IData[]>([]);
  const width = 330;
  const height = 200;
  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;
      ctx?.clearRect(0, 0, width, height);
      ctx!.fillStyle = '#f6f7f8';
      ctx!.fillRect(20, 20, width - 40, height - 50);
      for (let index = 1; index < 7; index += 1) {
        ctx!.beginPath();
        ctx!.lineWidth = 1;
        ctx!.strokeStyle = '#7b858f';
        ctx!.moveTo(20, 20 + index * 25);
        ctx!.lineTo(width - 20, 20 + index * 25);
        ctx!.stroke();
      }
      ctx!.beginPath();
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = '#7b858f';
      ctx!.moveTo(20, 20);
      ctx!.lineTo(20, height - 30);
      ctx!.stroke();
    }
  }, [dataChart, dateStart, dateEnd]);
  return (
    <div className='chart'>
      <div className='chart_title'>Chart total</div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
