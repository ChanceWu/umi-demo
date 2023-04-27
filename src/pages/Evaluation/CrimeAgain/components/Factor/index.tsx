import useCharts from '@/hooks/useCharts';
import useRefData from '@/hooks/useRefData';
import { Select } from 'antd';
import * as echarts from 'echarts/core';
import type { EChartsOption } from 'echarts/types/dist/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { useModel } from 'umi';
import InfoBlock from '../../../components/InfoBlock';
import styles from './index.less';

const { Option } = Select;

interface ToolTipData {
  name: string;
  value: number;
  original: string;
}

const baseOptions: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      const { name, value, original } = params.data;
      return `<div style="display: flex;justify-content: space-between;"><span>${params.marker}${name}</span><span style="margin-left: 10px">${original}</span></div><div>${value}</div>`;
    },
  },
  yAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#258CFC',
      },
    },
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    // data: ['K1', 'K2', 'K3', 'K4'],
  },
  xAxis: {
    type: 'value',
    boundaryGap: ['10%', '10%'],
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#333',
      formatter: (v: number) => (v === 0 ? '0' : ''),
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
    bottom: 20,
    top: 20,
    right: 10,
  },
  series: [
    {
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#F883B6' },
          { offset: 1, color: 'rgba(253, 129, 176, 0.5)' },
        ]),
      },
      label: {
        show: true,
        position: 'left',
        formatter: '{b}',
        color: '#333',
      },
    },
    {
      type: 'bar',
      barWidth: 10,
      barGap: '-100%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#00AFFD' },
          { offset: 1, color: '#0068E4' },
        ]),
      },
      label: {
        show: true,
        position: 'right',
        formatter: '{b}',
        color: '#333',
      },
    },
  ],
};

const Factor: React.FunctionComponent = () => {
  const { domRef, options, setOptions } = useCharts(baseOptions);
  const { featureInfo } = useModel('evaluation.crimeAgain');

  // 负
  const [negativeList, setNegativeList] = useState<EvaluationTypes.EvaFactor[]>([]);
  // 正
  const [positiveList, setPositiveList] = useState<EvaluationTypes.EvaFactor[]>([]);
  const [size, setSize] = useState<number>(10);

  const optionRef = useRefData(() => options);
  const listRef = useRefData(() => ({
    negativeList,
    positiveList,
  }));

  // 将格式化之后的添加到echarts的options
  const initChartsData = useCallback(() => {
    if (optionRef.current.series) {
      const formatter = (item: EvaluationTypes.EvaFactor): ToolTipData => ({
        name: item.feature,
        value: item.shap_value,
        original: item.values,
      });
      // 先配置负向
      optionRef.current.series[0].data = listRef.current.negativeList.map(formatter);
      // 再配置正向
      optionRef.current.series[1].data = listRef.current.positiveList.map(formatter);
    }
    setOptions(optionRef.current);
  }, [listRef, optionRef, setOptions]);

  // 初始化数值
  useEffect(() => {
    setNegativeList(
      featureInfo
        .filter((d) => d.shap_value < 0)
        .sort((p, n) => (p.shap_value > n.shap_value ? -1 : 1))
        .slice(-size),
    );
    setPositiveList(
      featureInfo
        .filter((d) => d.shap_value > 0)
        .sort((p, n) => (p.shap_value > n.shap_value ? 1 : -1))
        .slice(-size),
    );
    setTimeout(initChartsData, 0);
  }, [featureInfo, size, initChartsData]);

  return (
    <InfoBlock title="正/负影响因素排名">
      <div className={styles.legend}>
        <div>
          <span className={styles.legendSpan}>
            <div style={{ background: '#0068E4' }}></div>
            保护因子
          </span>
          <span className={styles.legendSpan}>
            <div style={{ background: '#F883B6' }}></div>
            危险因子
          </span>
        </div>
        <Select defaultValue={10} onChange={(s) => setSize(s)}>
          <Option value={10}>正/负前10</Option>
          <Option value={20}>正/负前20</Option>
        </Select>
      </div>
      <div ref={domRef} className={styles.charts}></div>{' '}
    </InfoBlock>
  );
};

export default Factor;
