import type { ComplexBarItemData } from '@/components/charts/ComplexBar';
import ComplexBar from '@/components/charts/ComplexBar';
import DividingLine from '@/components/common/DividingLine';
import RankList from '@/components/overview/RankList';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import React, { useState } from 'react';
import styles from './index.less';

const PleadGuiltyModel: React.FunctionComponent = () => {
  const [data] = useState<ComplexBarItemData[]>([
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 300] },
    { title: '盗窃', value: [200, 1000] },
    { title: '盗窃', value: [400, 100] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
    { title: '盗窃', value: [100, 200] },
  ]);
  return (
    <div className={styles.wrap}>
      <TrapezoidButton list={[{ title: '认罪悔罪评估' }]} desc="单位：人" />
      <DividingLine title="推荐职业人数前5" />
      <RankList
        data={[
          '机床工人',
          '裁缝',
          '理发师',
          '车工',
          '修理员',
          '机床工人',
          '裁缝',
          '理发师',
          '车工',
          '修理员',
        ]}
      />
      <div style={{ flex: 1 }}>
        <ComplexBar data={data} />
      </div>
    </div>
  );
};

export default PleadGuiltyModel;
