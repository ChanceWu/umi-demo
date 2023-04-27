import { formatValue } from '@/utils/utils';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const Cognition: React.FunctionComponent = () => {
  const { baseInfo } = useModel('crimeStore.evaluation');

  return (
    <div className={styles.wrap}>
      <div className={styles.container} style={{ flex: 2 }}>
        <div className={styles.humanWrap}>
          <img className={styles.humanHead} src={require('@/assets/images/evaluation/head.png')} />
          <img
            className={styles.humanBase}
            src={require('@/assets/images/evaluation/bodyBase.gif')}
          />
          <div className={styles.humanInfo}>
            <span>{`计算能力：${formatValue(baseInfo?.calculate_ability)}`}</span>
            <span>{`沟通能力：${formatValue(baseInfo?.communicate_ability)}`}</span>
            <span>{`分析能力：${formatValue(baseInfo?.analysis_ability)}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.bottomBorder}>
        <img src={require('@/assets/images/evaluation/right_bottom_border.png')} />
        <span>{`认知能力：${formatValue(baseInfo?.cognitive_ability)}`}</span>
      </div>
    </div>
  );
};

export default Cognition;
