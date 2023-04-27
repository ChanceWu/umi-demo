import useCharts from '@/hooks/useCharts';
import useMount from '@/hooks/useMount';
import * as echarts from 'echarts/core';
import type { EChartsOption, YAXisOption } from 'echarts/types/dist/shared';
import React, { useCallback, useEffect, useRef } from 'react';
import styles from './index.less';

const baseOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#fff',
    },
    axisTick: {
      show: false,
    },
  },
  grid: {
    left: 35,
    bottom: 0,
    top: 30,
    right: 100,
  },
  series: [
    {
      type: 'bar',
      barWidth: 16,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#0066E3' },
          { offset: 1, color: '#00B6FF' },
        ]),
        borderRadius: 8,
      },
      label: {
        show: true,
        position: 'right',
        valueAnimation: true,
        color: '#fff',
      },
    },
  ],
};

export type HorizontalBarItemData = { value: number; title: string };

interface IProp {
  data: HorizontalBarItemData[];
  color?: string | string[];
}

const HorizontalBar: React.FunctionComponent<IProp> = (props: IProp) => {
  const { data, color } = props;
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const optionsRef = useRef(options);

  const initColor = () => {
    // 设置一下颜色
    if (domRef.current) {
      if (optionsRef.current.series && optionsRef.current.series[0]) {
        if (typeof color === 'string') {
          optionsRef.current.series[0].itemStyle.color = new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [{ offset: 0, color }],
          );
        } else if (color instanceof Array && color.length) {
          optionsRef.current.series[0].itemStyle.color = new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
              { offset: 0, color: color[0] },
              { offset: 1, color: color[1] || color[0] },
            ],
          );
        }
        setOptions(optionsRef.current);
      }
    }
  };

  const setData = useCallback(() => {
    const types = data.map((item) => item.title);
    const values = data.map((item) => item.value);
    if (optionsRef.current.yAxis) (optionsRef.current.yAxis as YAXisOption).data = types;
    if (optionsRef.current.series) optionsRef.current.series[0].data = values;
    setOptions(optionsRef.current);
  }, [data, setOptions]);

  const setFormatter = useCallback(() => {
    if (optionsRef.current.series) {
      const total = data.reduce((all, item) => {
        return all + item.value;
      }, 0);
      optionsRef.current.series[0].label.formatter = (params: { value: number }) => {
        const percent = Math.floor((params.value / total) * 100);
        return `${params.value}人，占比${percent}%`;
      };
    }
  }, [data]);

  useMount(() => {
    initColor();
  });

  useEffect(() => {
    setFormatter();
    setData();
  }, [data, setData, setFormatter]);

  return <div ref={domRef} className={styles.histogram}></div>;
};

HorizontalBar.defaultProps = {
  color: ['#00B6FF', '#0066E3'],
};

export default HorizontalBar;
