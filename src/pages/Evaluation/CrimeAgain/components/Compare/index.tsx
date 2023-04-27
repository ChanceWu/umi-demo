import IntervalBar from '@/pages/Evaluation/components/IntervalBar';
import React from 'react';
import InfoBlock from '../../../components/InfoBlock';
import styles from './index.less';

const Compare: React.FunctionComponent = () => {
  return (
    <InfoBlock title="个体与群体再犯罪对比（待上线）">
      <div className={styles.row}>
        <IntervalBar title="同罪名再犯罪分值对比" subTitle="罪犯罪名：聚众斗殴" />
        <IntervalBar title="同年龄再犯罪分值对比" subTitle="罪犯年龄：43岁" />
        <IntervalBar title="同学历再犯罪分值对比" subTitle="罪犯学历：高中" />
      </div>
    </InfoBlock>
  );
};

export default Compare;
