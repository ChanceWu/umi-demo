import React from 'react';
import InfoBlock from '../../../../components/InfoBlock';
import styles from './index.less';

const AttachBlock: React.FunctionComponent = () => {
  return (
    <div style={{ position: 'relative' }}>
      <InfoBlock
        className={styles.blockWrap}
        title="可依据算法灵活拓展更多评估分析图表"
        style={{ flex: 2 }}
      >
        <div className={styles.imgWrap}>
          <img src={require('@/assets/images/evaluation/chart2.png')} />
          <img src={require('@/assets/images/evaluation/chart1.png')} />
        </div>
      </InfoBlock>
      <span className={styles.text}>可依据算法灵活拓展更多评估分析图表</span>
    </div>
  );
};

export default AttachBlock;
