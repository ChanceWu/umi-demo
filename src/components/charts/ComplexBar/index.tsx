import useCharts from '@/hooks/useCharts';
import useMount from '@/hooks/useMount';
import * as echarts from 'echarts/core';
import type {
  DataZoomComponentOption,
  EChartsOption,
  SeriesOption,
  XAXisOption,
} from 'echarts/types/dist/shared';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

const baseOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 30,
    },
  ],
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
    data: [],
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
    top: 30,
    right: 10,
  },
};

export type ComplexBarItemData = { value: number[]; title: string };

export type ColOption = { name: string; color: string | string[] };

interface IProp {
  data: ComplexBarItemData[];
  title?: string;
  showLegend?: boolean;
  colOptions?: ColOption[];
}

const ComplexBar: React.FunctionComponent<IProp> = (props: IProp) => {
  const { data, title, showLegend } = props;
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const optionsRef = useRef(options);

  // 列和颜色
  const initCols = () => {
    if (domRef.current) {
      optionsRef.current.series = [];
      const legendData: string[] = [];
      props.colOptions!.forEach((item) => {
        // 设置 series
        const series: EChartsOption['series'] = {
          type: 'bar',
          barWidth: 18,
          name: item.name,
          itemStyle: {},
        };
        if (typeof item.color === 'string' && series.itemStyle) {
          series.itemStyle.color = item.color;
        } else if (item.color instanceof Array && series.itemStyle) {
          series.itemStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: item.color[0] },
            { offset: 1, color: item.color[1] || item.color[0] },
          ]);
        }
        (optionsRef.current.series as SeriesOption[]).push(series);
        legendData.push(item.name);
      });
      if (showLegend) {
        optionsRef.current.legend = {
          data: legendData,
          textStyle: {
            color: '#ffffff',
          },
          formatter: (name) => name.slice(0, 1),
          right: 0,
          tooltip: {
            show: true,
          },
        };
      }
      setOptions(optionsRef.current);
    }
  };

  // 初始化title
  const initTitle = () => {
    // 设置标题
    if (title) {
      optionsRef.current.title = {
        text: title,
        left: -5,
        textStyle: {
          fontSize: 14,
          color: '#2788f2',
          fontWeight: 400,
        },
      };
      if (optionsRef.current.grid && !(optionsRef.current.grid instanceof Array))
        optionsRef.current.grid.top = 40;
      setOptions(optionsRef.current);
    }
  };

  useMount(() => {
    initTitle();
    initCols();
  });

  // data改变时重置
  useEffect(() => {
    if (domRef.current) {
      if (optionsRef.current.series && optionsRef.current.series instanceof Array) {
        optionsRef.current.series.forEach((item, index) => {
          (optionsRef.current.series as SeriesOption)[index].data = data.map((d) => d.value[index]);
        });
        // 设置x
        (optionsRef.current.xAxis as XAXisOption).data = data.map((d) => d.title);
        (optionsRef.current.dataZoom as DataZoomComponentOption[])[0].end = Math.floor(
          (7 / data.length) * 100,
        );
      }
      setOptions(optionsRef.current);
    }
  }, [data, domRef, setOptions]);

  return <div ref={domRef} className={styles.histogram}></div>;
};

ComplexBar.defaultProps = {
  colOptions: [
    { name: '入监时本职业人数', color: ['#00AFFD', 'rgba(0, 104, 228, 0.12)'] },
    { name: '出监时本职业人数', color: ['#F883B6', 'rgba(253, 129, 176, 0.1)'] },
  ],
};

export default ComplexBar;
