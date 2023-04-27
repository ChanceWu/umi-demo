import type { BarItemData } from '@/components/charts/Bar';
import Bar from '@/components/charts/Bar';
import DividingLine from '@/components/common/DividingLine';
import StateCircle from '@/components/overview/StateCircle';
import type { CircleItemProps } from '@/components/overview/StateCircle/StateCircleItem';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import React, { useState } from 'react';
import styles from './index.less';

const RetrofitModel: React.FunctionComponent = () => {
  const [stateList] = useState<CircleItemProps[]>([
    { text: '一级', color: '#23CEFD', desc: '445人' },
    { text: '二级', color: '#23CEFD', desc: '221人' },
    { text: '三级', color: '#23CEFD', desc: '102人' },
    { text: '四级', color: '#23CEFD', desc: '221人' },
    { text: '五级', color: '#23CEFD', desc: '102人', notActiveOpacity: 0.4 },
  ]);
  const [data] = useState<BarItemData[]>([
    { title: '盗窃', value: 100 },
    { title: '行凶', value: 150 },
    { title: '自杀', value: 200 },
    { title: '盗窃', value: 170 },
    { title: '行凶', value: 160 },
    { title: '盗窃', value: 30 },
    { title: '自杀', value: 27 },
    { title: '盗窃', value: 192 },
    { title: '自杀', value: 120 },
  ]);
  return (
    <div className={styles.wrap}>
      <TrapezoidButton list={[{ title: '改造难易度评估' }]} desc="单位：人" />
      <DividingLine title="评估等级统计" />
      <StateCircle list={stateList} />
      <div style={{ flex: 1 }}>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default RetrofitModel;
