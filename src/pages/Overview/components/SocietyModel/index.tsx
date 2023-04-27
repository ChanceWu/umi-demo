import React, { useState } from 'react';
import styles from './index.less';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import DividingLine from '@/components/common/DividingLine';
import StateCircle from '@/components/overview/StateCircle';
import type { CircleItemProps } from '@/components/overview/StateCircle/StateCircleItem';
import type { BarItemData } from '@/components/charts/Bar';
import Bar from '@/components/charts/Bar';

const SocietyModel: React.FunctionComponent = () => {
  const [stateList] = useState<CircleItemProps[]>([
    { text: '高', color: '#23CEFD', desc: '445人' },
    { text: '中', color: '#23CEFD', desc: '221人' },
    { text: '低', color: '#23CEFD', desc: '102人' },
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
    // <div className={`${styles.wrap} blurLoading`}>
    <div className={`${styles.wrap}`}>
      <TrapezoidButton list={[{ title: '社会适应性评估统计' }]} desc="单位：人" />
      <DividingLine title="评估等级统计" />
      <StateCircle list={stateList} />
      <div style={{ flex: 1 }}>
        <Bar data={data} title="各犯罪类型统计" />
      </div>
    </div>
  );
};

export default SocietyModel;
