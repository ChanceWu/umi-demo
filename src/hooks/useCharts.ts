/**
 * 初始化echarts图
 */
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GraphicComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { cloneDeep } from 'lodash-es';
import { useCallback, useRef, useState } from 'react';
import useMount from './useMount';
import useResize from './useResize';
// echarts注册插件
echarts.use([
  RadarChart,
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendComponent,
  CanvasRenderer,
  GraphicComponent,
]);

const baseOptions: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['自杀', '行凶', '盗窃', '逃脱', '自杀', '行凶', '盗窃', '行凶', '盗窃'],
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
      data: [120, 200, 150, 80, 70, 110, 130, 110, 130],
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

/**
 * 方便统一echarts的初始化和resize
 * @param bsOpts 初始化配置
 */
function useCharts(bsOpts = baseOptions) {
  const domRef = useRef<HTMLDivElement>(null);
  const charts = useRef<echarts.ECharts>();
  const [options, changeOptions] = useState(() => cloneDeep(bsOpts));
  const [setResizeCallback] = useResize();

  const initCharts = useCallback(() => {
    if (domRef.current) {
      charts.current = echarts.init(domRef.current);
      charts.current.setOption(options);
    }
  }, [options]);

  const resizeCharts = useCallback(() => {
    if (charts.current) {
      charts.current.resize();
    }
  }, []);

  const setOptions = useCallback((newOptions: EChartsOption) => {
    const opts = { ...newOptions };
    changeOptions(opts);
    charts.current?.setOption(opts);
  }, []);

  useMount(() => {
    // 初始化charts对象
    initCharts();
    // resize更新
    setResizeCallback(resizeCharts);
  });

  return {
    domRef,
    options,
    setOptions,
    resizeCharts,
  };
}

export default useCharts;
