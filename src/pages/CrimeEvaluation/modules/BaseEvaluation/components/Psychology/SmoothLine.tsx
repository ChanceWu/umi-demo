import useCharts from '@/hooks/useCharts';
import type { EChartsOption, XAXisOption } from 'echarts/types/dist/shared';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const baseOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    boundaryGap: false,
    type: 'category',
    axisLine: {
      lineStyle: {
        color: 'rgba(0,0,0,0.15)',
      },
    },
    axisLabel: {
      show: false
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
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(0,0,0,0.15)',
        opacity: 0.3,
      },
    },
  },
  grid: {
    left: 0,
    bottom: 5,
    top: 10,
    right: 0,
  },
  series: [
    {
      type: 'line',
      itemStyle: {
        color: '#1890FF',
      },
      showSymbol: false,
      areaStyle: {
        color: '#d6e3fd',
      },
      smooth: true,
    },
  ],
};

export type LineItemData = { value: number; title: string };

interface IProp {
  data: LineItemData[];
}

const SmoothLine: React.FunctionComponent<IProp> = (props: IProp) => {
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

  return <div ref={domRef} className={styles.chart}></div>;
};

export default SmoothLine;
