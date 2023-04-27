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
        color: '#258CFC',
      },
    },
    axisLabel: {
      color: '#fff',
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#fff',
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
    left: 30,
    bottom: 20,
    top: 30,
    right: 0,
  },
  series: [
    {
      type: 'line',
      itemStyle: {
        color: '#00AFFD',
      },
    },
  ],
};

export type LineItemData = { value: number; title: string };

interface IProp {
  data: LineItemData[];
}

const Line: React.FunctionComponent<IProp> = (props: IProp) => {
  const { data } = props;
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const optionsRef = useRef(options);

  // data改变时更新
  useEffect(() => {
    const types = data.map((item) => item.title);
    const values = data.map((item) => item.value);
    if (optionsRef.current.xAxis) (optionsRef.current.xAxis as XAXisOption).data = types;
    if (optionsRef.current.series) optionsRef.current.series[0].data = values;
    setOptions(optionsRef.current);
  }, [data, setOptions]);

  return <div ref={domRef} className={styles.line}></div>;
};

export default Line;
