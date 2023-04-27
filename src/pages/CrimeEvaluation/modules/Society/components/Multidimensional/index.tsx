import ModuleName from '@/pages/CrimeEvaluation/components/ModuleName';
import React from 'react';
import { useModel } from 'umi';
import FactorDetail from './FactorDetail';
import styles from './index.less';
import Radar from './Radar';

const Multidimensional: React.FunctionComponent = () => {
  const { adaptInfo, baseInfo } = useModel('crimeStore.evaluation');
  const avgs: number[] = [
    adaptInfo?.avg_social_support || 0,
    adaptInfo?.avg_employ_ability || 0,
    adaptInfo?.avg_prison_attitude || 0,
    adaptInfo?.avg_psychosomatic_state || 0,
    adaptInfo?.avg_conduct_standard || 0,
  ];
  const curs: number[] = [
    adaptInfo?.social_support || 0,
    adaptInfo?.employ_ability || 0,
    adaptInfo?.prison_attitude || 0,
    adaptInfo?.psychosomatic_state || 0,
    adaptInfo?.conduct_standard || 0,
  ];
  return (
    <div className={styles.wrap}>
      <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
        <ModuleName style={{ marginBottom: 10 }}>多维度评估</ModuleName>
        <Radar
          style={{ flex: 1 }}
          data={[
            {
              value: avgs,
              name: '平均分',
            },
            {
              value: curs,
              name: baseInfo?.name || '',
            },
          ]}
          indicator={[
            { name: '社会支持', max: 100 },
            { name: '就业能力', max: 100 },
            { name: '服刑态度', max: 100 },
            { name: '身心状况', max: 100 },
            { name: '行为规范', max: 100 },
          ]}
        />
      </div>
      <div style={{ marginLeft: 20, flex: 5 }}>
        <ModuleName style={{ marginBottom: 10 }}>评估因子详情</ModuleName>
        <FactorDetail />
      </div>
    </div>
  );
};

export default Multidimensional;
