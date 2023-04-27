import type { PieItemData } from '@/components/charts/Pie';
import Pie from '@/components/charts/Pie';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import React, { useState } from 'react';
import styles from './index.less';

const FiveReModel: React.FunctionComponent = () => {
  const [data] = useState<PieItemData[]>([
    { value: 143, name: '涉黑' },
    { value: 124, name: '涉毒' },
    { value: 232, name: '涉恶' },
    { value: 232, name: '涉枪' },
    { value: 232, name: '涉恐' },
  ]);

  return (
    <div className={styles.wrap}>
      <TrapezoidButton list={[{ title: '五涉犯人统计' }]} />
      <div className={styles.summaryWrap}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default FiveReModel;
