import useCharts from '@/hooks/useCharts';
import type { EChartsOption, LegendComponentOption, RadarOption } from 'echarts/types/dist/shared';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const baseOptions: EChartsOption = {
  color: ['#5B8FF9', '#5AD8A6'],
  tooltip: {
    trigger: 'item',
  },
  legend: {
    left: 10,
    orient: 'vertical',
  },
  radar: {
    // shape: 'circle',
    indicator: [],
    center: ['50%', '55%'],
  },
  series: [
    {
      type: 'radar',
      areaStyle: {},
    },
  ],
};

export type RadarItemData = { value: number[]; name: string };
export type Indicator = { name: string; max: number };

interface IProp {
  data: RadarItemData[];
  indicator: Indicator[];
  style?: React.CSSProperties;
}

const Radar: React.FunctionComponent<IProp> = (props: IProp) => {
  const { data, indicator } = props;
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const optionsRef = useRef(options);

  // data改变时更新
  useEffect(() => {
    const types = data.map((item) => item.name);
    if (optionsRef.current.legend)
      (optionsRef.current.legend as LegendComponentOption).data = types;
    if (optionsRef.current.series) optionsRef.current.series[0].data = [...data];
    if (optionsRef.current.radar)
      (optionsRef.current.radar as RadarOption).indicator = [...indicator];
    setOptions(optionsRef.current);
  }, [data, indicator, setOptions]);

  return <div ref={domRef} className={styles.radar} style={props.style}></div>;
};

export default Radar;
