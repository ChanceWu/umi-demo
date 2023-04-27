import React from 'react';
import styles from './index.less';

interface IProps {
  data?: CrimeEvaluationType.VitalSign;
}

const Record: React.FunctionComponent<IProps> = ({ data }) => {
  const { temperature, pulse, heart_rate, create_date } = data || {};
  return (
    <div className={styles.record}>
      <span>记录时间：{create_date}</span>
      <div className={styles.textRow}>
        <span>体温（度）</span>
        <span>{temperature}</span>
      </div>
      <div className={styles.textRow}>
        <span>脉搏（次/分钟）</span>
        <span>{pulse}</span>
      </div>
      <div className={styles.textRow}>
        <span>心率（次/分钟）</span>
        <span>{heart_rate}</span>
      </div>
    </div>
  );
};

export default Record;
