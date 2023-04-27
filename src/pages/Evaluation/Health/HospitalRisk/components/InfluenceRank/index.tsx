import InfoBlock from '@/components/layout/InfoBlock';
import useCharts from '@/hooks/useCharts';
import { Select } from 'antd';
import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts/types/dist/shared';
import React from 'react';
import styles from './index.less';

const { Option } = Select;

const baseOptions: EChartsOption = {
  xAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#258CFC',
      },
    },
    axisLabel: {
      color: '#fff',
    },
    axisTick: {
      show: false,
    },
    data: ['2022年', '2023年'],
  },
  yAxis: {
    name: '分值',
    max: 100,
    nameTextStyle: {
      align: 'right',
      color: '#fff',
    },
    type: 'value',
    boundaryGap: ['0%', '10%'],
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#fff',
      formatter: (v: number) => String(Math.abs(v)),
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#258CFC',
        opacity: 0.3,
      },
    },
  },
  grid: {
    containLabel: true,
    left: 10,
    bottom: 10,
    top: 45,
    right: 10,
  },
  series: [
    {
      type: 'bar',
      barWidth: 45,
      barGap: '-100%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00AFFD' },
          { offset: 1, color: '#0068E4' },
        ]),
      },
      label: {
        show: true,
        position: 'top',
        color: '#fff',
      },
      data: [80, 65],
    },
  ],
};

const InfluenceRank: React.FunctionComponent = () => {
  const { domRef } = useCharts(baseOptions);

  return (
    <InfoBlock
      title="住院因素影响值排名"
      desc={
        <Select defaultValue={10}>
          <Option value={10}>影响因素前10</Option>
          <Option value={20}>影响因素前20</Option>
        </Select>
      }
    >
      <div ref={domRef} className={styles.charts}></div>{' '}
    </InfoBlock>
  );
};

export default InfluenceRank;
