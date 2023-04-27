import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const LaborLabels: React.FunctionComponent = () => {
  const { technolog } = useModel('crimeStore.evaluation');

  return (
    <div className={styles.row}>
      <div className={styles.block}>
        <div className={styles.header}>
          <span>就业兴趣（最近一次自评）</span>
        </div>
        <div className={styles.content}>
          <span>{technolog?.employment_interest}</span>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.header}>
          <span>就业特长、技能</span>
        </div>
        <div className={styles.content}>
          <span>{technolog?.special_skill}</span>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.header}>
          <span>团队工作</span>
        </div>
        <div className={styles.content}>
          <span>{technolog?.team_work}</span>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.header}>
          <span>就业观</span>
        </div>
        <div className={styles.content}>
          <span>{technolog?.employment_view}</span>
        </div>
      </div>
    </div>
  );
};

export default LaborLabels;
