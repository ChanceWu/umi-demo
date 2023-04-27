import useCharts from '@/hooks/useCharts';
import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts/types/dist/shared';
import React from 'react';
import styles from './index.less';

const baseOptions: EChartsOption = {
  xAxis: {
    name: '分值',
    nameTextStyle: {
      color: '#333',
      verticalAlign: 'top',
    },
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#258CFC',
      },
    },
    axisLabel: {
      // show: false,
      interval: 0,
      color: '#333',
      margin: 10,
      fontSize: 10,
      rotate: -45,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      // show: true,
      // lineStyle: {
      //   type: 'dashed',
      //   color: '#258CFC',
      //   opacity: 0.3,
      // },
    },
    data: Array(10)
      .fill(0)
      .map((d, i) => `${i * 10}-${(i + 1) * 10}`),
  },
  yAxis: {
    type: 'value',
    name: '人数',
    nameTextStyle: {
      color: '#333',
      align: 'right',
    },
    axisLabel: {
      color: '#333',
    },
    splitLine: {
      show: false,
    },
  },
  grid: {
    containLabel: true,
    left: 0,
    bottom: 0,
    top: 40,
    right: 50,
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00AFFD' },
          { offset: 1, color: '#0068E4' },
        ]),
      },
      label: {
        show: true,
        position: 'top',
        color: '#333',
      },
      // showBackground: true,
      data: [
        50,
        10,
        20,
        45,
        60,
        80,
        90,
        100,
        0,
        {
          value: 7,
          itemStyle: {
            color: 'rgba(248, 131, 182, 0.9)',
          },
        },
      ],
    },
  ],
};

interface IProps {
  title: string;
  subTitle: string;
}

const IntervalBar: React.FunctionComponent<IProps> = (props) => {
  const { domRef } = useCharts(baseOptions);

  return (
    <div>
      <div className={styles.titleWrap}>
        <h3 className={styles.title}>{props.title}</h3>
        <div className={styles.subTitle}>
          <span>{props.subTitle}</span>
          <div className={styles.marker}></div>
          <span>当前罪犯分值所在区间</span>
        </div>
      </div>
      <div ref={domRef} className={styles.charts}></div>
    </div>
  );
};

export default IntervalBar;
