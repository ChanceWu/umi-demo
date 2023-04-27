import useCharts from '@/hooks/useCharts';
import useRefData from '@/hooks/useRefData';
import { Select } from 'antd';
import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts/types/dist/shared';
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import InfoBlock from '../../../../components/InfoBlock';

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
      color: '#333333',
      interval: 0,
    },
    axisTick: {
      show: false,
    },
    data: [],
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
      color: '#333333',
      formatter: '{value}%',
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
    top: 10,
    right: 10,
  },
  series: [
    {
      type: 'bar',
      barWidth: 20,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00AFFD' },
          { offset: 1, color: '#0068E4' },
        ]),
      },
      label: {
        show: true,
        position: 'top',
        formatter: '{c}%',
        color: '#fff',
      },
      data: [],
    },
  ],
};

const LaborCompletion: React.FunctionComponent = () => {
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const { laborFinish } = useModel('evaluation.job');

  const optionsRef = useRefData(() => options);

  useEffect(() => {
    if (optionsRef.current.series && optionsRef.current.series[0]) {
      optionsRef.current.series[0].data = laborFinish.map((item) => item.per * 100);
    }
    if (optionsRef.current.xAxis && !(optionsRef.current.xAxis instanceof Array)) {
      optionsRef.current.xAxis.data = laborFinish.map((item) => item.createdate);
    }
    setOptions(optionsRef.current);
  }, [laborFinish, optionsRef, setOptions]);

  return (
    <InfoBlock
      title="劳动完成情况"
      style={{ flex: 1 }}
      desc={
        <Select className={styles.select} defaultValue={10}>
          <Option value={10}>电子线圈-4级</Option>
          <Option value={1}>服装加工-3级</Option>
          <Option value={2}>服装加工-2级</Option>
          <Option value={3}>其它类-2级</Option>
        </Select>
      }
    >
      <div className={styles.content}>
        <div className={styles.legend}>
          <span>完成度（%）</span>
          <span>当月完成百分比</span>
        </div>
        <div ref={domRef} className={styles.charts}></div>{' '}
      </div>
    </InfoBlock>
  );
};

export default LaborCompletion;
