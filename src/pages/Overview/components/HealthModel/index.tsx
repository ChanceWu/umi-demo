import React, { useState } from 'react';
import styles from './index.less';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import DividingLine from '@/components/common/DividingLine';
import HealthNumber from '@/components/overview/HealthNumber';
import type { BarItemData } from '@/components/charts/Bar';
import Bar from '@/components/charts/Bar';

const HealthModel: React.FunctionComponent = () => {
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
      <TrapezoidButton list={[{ title: '身心健康评估' }]} desc="单位：人" />
      <DividingLine title="身心健康各等级人数" />
      <HealthNumber />
      <div style={{ flex: 1 }}>
        <Bar data={data} title="各疾病罪犯人数" />
      </div>
    </div>
  );
};

export default HealthModel;
