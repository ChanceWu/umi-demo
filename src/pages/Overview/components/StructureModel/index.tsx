import HorizontalBar from '@/components/charts/HorizontalBar';
import type { LineItemData } from '@/components/charts/Line';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import React, { useState } from 'react';
import styles from './index.less';

const SituationModel: React.FunctionComponent = () => {
  const [data] = useState<LineItemData[]>([
    { title: '文盲', value: 100 },
    { title: '小学', value: 450 },
    { title: '初中', value: 200 },
    { title: '高中', value: 170 },
    { title: '大学', value: 560 },
    { title: '硕士', value: 200 },
    { title: '博士', value: 100 },
  ]);
  return (
    <div className={styles.wrap}>
      <TrapezoidButton list={[{ title: '各学历犯人排名统计' }]} desc="单位：人" />
      <div style={{ flex: 1 }}>
        <HorizontalBar data={data} />
      </div>
    </div>
  );
};

export default SituationModel;
