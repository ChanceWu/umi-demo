import type { ComplexBarItemData } from '@/components/charts/ComplexBar';
import ComplexBar from '@/components/charts/ComplexBar';
import DividingLine from '@/components/common/DividingLine';
import RankList from '@/components/overview/RankList';
import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import React, { useState } from 'react';
import styles from './index.less';

const TechnologyModel: React.FunctionComponent = () => {
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
      <TrapezoidButton list={[{ title: '职业技术能力评估' }]} desc="单位：人" />
      <DividingLine title="各职业就业推荐人数前10排名" />
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
        <ComplexBar data={data} title="犯人职业评估" showLegend />
      </div>
    </div>
  );
};

export default TechnologyModel;
