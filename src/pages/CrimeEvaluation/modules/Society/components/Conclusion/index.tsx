import StateBlock from '@/components/crime/StateBlock';
import ModuleName from '@/pages/CrimeEvaluation/components/ModuleName';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const Conclusion: React.FunctionComponent = () => {
  const { adaptInfo } = useModel('crimeStore.evaluation');
  return (
    <div className={styles.wrap}>
      <div>
        <ModuleName style={{ marginBottom: 10 }}>评估结论</ModuleName>
        <StateBlock
          state={adaptInfo?.adapt_level || ''}
          value={adaptInfo?.adapt_value || ''}
          desc={'总体得分'}
          color="green"
        />
      </div>
      <div style={{ marginLeft: 20 }}>
        <ModuleName style={{ marginBottom: 10 }}>评估结论</ModuleName>
        <div className={styles.desc}>{adaptInfo?.dec_conclusion}</div>
      </div>
    </div>
  );
};

export default Conclusion;
