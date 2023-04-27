import useCharts from '@/hooks/useCharts';
import useMount from '@/hooks/useMount';
import * as echarts from 'echarts/core';
import type { EChartsOption, SeriesOption, XAXisOption } from 'echarts/types/dist/shared';
import React, { useCallback, useEffect, useRef } from 'react';
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
    left: 40,
    bottom: 20,
    top: 15,
    right: 10,
  },
  series: [
    {
      type: 'bar',
      barWidth: 18,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00AFFD' },
          { offset: 1, color: '#0068E4' },
        ]),
      },
    },
  ],
};

export type BarItemData = { value: number; title: string };

interface IProp {
  data: BarItemData[];
  title?: string;
  color?: string | string[];
}

const Histogram: React.FunctionComponent<IProp> = (props: IProp) => {
  const { data, color, title } = props;
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const optionRef = useRef(options);

  // 初始化颜色
  const initColor = useCallback(() => {
    // 设置一下颜色
    if (domRef.current) {
      if (optionRef.current.series && optionRef.current.series instanceof Array) {
        optionRef.current.series.forEach((item, index) => {
          if (typeof color === 'string') {
            (optionRef.current.series as SeriesOption)[index].itemStyle.color =
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color }]);
          } else if (color instanceof Array && color.length) {
            (optionRef.current.series as SeriesOption)[index].itemStyle.color =
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[0] },
                { offset: 1, color: color[1] || color[0] },
              ]);
          }
        });
        setOptions(optionRef.current);
      }
    }
  }, [color, domRef, setOptions]);

  // 初始化title
  const initTitle = useCallback(() => {
    // 设置标题
    if (title) {
      optionRef.current.title = {
        text: title,
        left: -5,
        textStyle: {
          fontSize: 14,
          color: '#2788f2',
          fontWeight: 400,
        },
      };
      if (optionRef.current.grid && !(optionRef.current.grid instanceof Array))
        optionRef.current.grid.top = 40;
      setOptions(optionRef.current);
    }
  }, [setOptions, title]);

  useMount(() => {
    initTitle();
    initColor();
  });

  // 设置数据data
  useEffect(() => {
    const types = data.map((item) => item.title);
    const values = data.map((item) => item.value);
    if (optionRef.current.xAxis) (optionRef.current.xAxis as XAXisOption).data = types;
    if (optionRef.current.series) optionRef.current.series[0].data = values;
    setOptions(optionRef.current);
  }, [data, setOptions]);

  return <div ref={domRef} className={styles.histogram}></div>;
};

Histogram.defaultProps = {
  color: ['#00AFFD', 'rgba(0, 104, 228, 0.12)'],
};

export default Histogram;
