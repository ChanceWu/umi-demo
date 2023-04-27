import useCharts from '@/hooks/useCharts';
import useRefData from '@/hooks/useRefData';
import type { EChartsOption } from 'echarts/types/dist/shared';
import React, { useEffect } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

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
      rotate: -20,
      align: 'center',
      margin: 25,
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
    bottom: 0,
    top: 10,
    right: 10,
  },
  series: [
    {
      type: 'bar',
      barWidth: 20,
      itemStyle: {
        color: '#6395F9',
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

const CompletionRate: React.FunctionComponent = () => {
  const { technolog } = useModel('crimeStore.evaluation');
  const { domRef, options, setOptions } = useCharts(baseOptions);

  const optionsRef = useRefData(() => options);

  useEffect(() => {
    if (optionsRef.current.series && optionsRef.current.series[0]) {
      optionsRef.current.series[0].data = technolog?.work_finish?.map((item) => item.per * 100);
    }
    if (optionsRef.current.xAxis && !(optionsRef.current.xAxis instanceof Array)) {
      optionsRef.current.xAxis.data = technolog?.work_finish?.map((item) => item.createdate);
    }
    setOptions(optionsRef.current);
  }, [technolog?.work_finish, optionsRef, setOptions]);

  return (
    <div className={styles.completionRateWrap}>
      <span>劳动完成率</span>
      <div className={styles.border}>
        <div className={styles.legend}>
          <span>完成度（%）</span>
          <span>当月完成百分比</span>
        </div>
        <div ref={domRef} className={styles.charts}></div>{' '}
      </div>
    </div>
  );
};

export default CompletionRate;
