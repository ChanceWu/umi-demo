import useCharts from '@/hooks/useCharts';
import type { EChartsOption } from 'echarts/types/dist/shared';
import React, { useCallback, useEffect, useRef } from 'react';
import styles from './index.less';

const baseOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} {c}人 {d}%',
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      label: {
        formatter: '{b} {c}人',
        color: '#fff',
      },
      labelLine: {
        length: 10,
      },
    },
  ],
};

export type PieItemData = { value: number; name: string };

interface IProp {
  data: PieItemData[];
  showLegend?: boolean;
}

const Pie: React.FunctionComponent<IProp> = (props: IProp) => {
  const { data, showLegend } = props;
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const optionsRef = useRef(options);

  const setData = useCallback(() => {
    optionsRef.current.series![0].data = data;
    setOptions(optionsRef.current);
  }, [data, setOptions]);

  const setLegend = useCallback(() => {
    optionsRef.current.legend = {
      type: 'plain',
      right: 10,
      top: 20,
      bottom: 20,
      orient: 'vertical',
      data: data.map((item) => item.name),
      textStyle: {
        color: '#fff',
      },
    };
  }, [data]);

  useEffect(() => {
    if (showLegend) setLegend();
    setData();
  }, [data, setData, setLegend, showLegend]);

  return <div ref={domRef} className={styles.wrap}></div>;
};

Pie.defaultProps = {
  showLegend: false,
};

export default Pie;
