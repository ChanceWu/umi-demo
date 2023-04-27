import useCharts from '@/hooks/useCharts';
import type { EChartsOption, XAXisOption } from 'echarts/types/dist/shared';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const baseOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#000000',
      },
    },
    axisLabel: {
      color: '#000000',
    },
    axisTick: {
      show: false,
    },
    data: ['1', '2', '3', '4', '5']
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#000000',
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.15)',
        opacity: 0.3,
      },
    },
  },
  grid: {
    left: 30,
    bottom: 20,
    top: 30,
    right: 20,
  },
  series: [
    {
      type: 'line',
      // itemStyle: {
      //   color: '#00AFFD',
      // },
    },
  ],
};

export type LineItemData = { value: number; title: string };

interface IProp {
  title: string;
  data: LineItemData[];
  color?: string;
}

const Line: React.FunctionComponent<IProp> = (props: IProp) => {
  const { data, title } = props;
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const optionsRef = useRef(options);

  // data改变时更新
  useEffect(() => {
    const types = data.map((item) => item.title);
    const values = data.map((item) => item.value);
    if (optionsRef.current.xAxis) (optionsRef.current.xAxis as XAXisOption).data = types;
    if (optionsRef.current.series) optionsRef.current.series[0].data = values;
    if (optionsRef.current.series) optionsRef.current.series[0].itemStyle = {
      color: props.color || '#00AFFD',
    };
    setOptions(optionsRef.current);
  }, [data, props.color, setOptions]);

  return (
    <div className={styles.line}>
      <span>{title}</span>
      <div ref={domRef} style={{width: '100%'}}></div>
    </div>
  )
};

export default Line;
