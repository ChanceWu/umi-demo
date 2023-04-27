import type { PieItemData } from '@/components/charts/Pie';
import Pie from '@/components/charts/Pie';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import React, { useState } from 'react';
import styles from './index.less';

const ReEscortStruct: React.FunctionComponent = () => {
  const [data] = useState<PieItemData[]>([
    { value: 143, name: '有期徒刑' },
    { value: 124, name: '无期徒刑' },
    { value: 232, name: '死缓' },
  ]);

  return (
    <div className={styles.wrap}>
      <TrapezoidButton list={[{ title: '在押犯人结构' }]} />
      <div className={styles.summaryWrap}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ReEscortStruct;
