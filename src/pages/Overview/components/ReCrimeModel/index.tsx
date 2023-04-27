import type { BarItemData } from '@/components/charts/Bar';
import Bar from '@/components/charts/Bar';
import DividingLine from '@/components/common/DividingLine';
import StateCircle from '@/components/overview/StateCircle';
import type { CircleItemProps } from '@/components/overview/StateCircle/StateCircleItem';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import React, { useState } from 'react';
import styles from './index.less';

const ReCrimeModel: React.FunctionComponent = () => {
  const [stateList] = useState<CircleItemProps[]>([
    { text: '有风险', color: 'rgb(239, 55, 98)', desc: '35人' },
    { text: '无风险', color: 'rgb(35, 206, 253)', desc: '65人' },
  ]);
  const [data] = useState<BarItemData[]>([
    { title: 'imprison_time', value: 50 },
    { title: 'treat_level_考察级', value: 23 },
    { title: 'is_drug', value: 10 },
  ]);
  return (
    <div className={styles.wrap}>
      <TrapezoidButton list={[{ title: '再犯罪预测评估统计' }]} desc="单位：人" />
      <DividingLine title="评估等级统计" />
      <StateCircle list={stateList} />
      <div style={{ flex: 1 }}>
        <Bar
          data={data}
          color={['#7D5DF4', 'rgba(127, 88, 244, 0.13)']}
          title="该等级评估因素排名"
        />
      </div>
    </div>
  );
};

export default ReCrimeModel;
