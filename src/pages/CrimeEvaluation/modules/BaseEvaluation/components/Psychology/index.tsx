import ModuleName from '@/pages/CrimeEvaluation/components/ModuleName';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import SmoothLine from './SmoothLine';

// ['bc', 'border', 'font']
const colors = [
  ['#FFF4F3', '#F5A2A2', '#D52E2D'],
  ['#FFF0E9', '#FFB79B', '#B14316'],
];

const Psychology: React.FunctionComponent = () => {
  const { baseInfo } = useModel('crimeStore.evaluation');
  return (
    <div className={styles.wrap}>
      <div className={styles.hisRow}>
        <span>历史疾病：</span>
        {baseInfo?.heart_medical_his?.split('、').map((item, index) => (
          <span
            className={styles.label}
            style={{
              background: colors[index % 2][0],
              borderColor: colors[index % 2][1],
              color: colors[index % 2][2],
            }}
            key={String(index)}
          >
            {item}
          </span>
        ))}
      </div>
      <ModuleName>情绪变化（最近检测）</ModuleName>
      <SmoothLine
        data={
          baseInfo?.mood_swing_list.map((item) => ({
            title: item.date,
            value: Number(item.score),
          })) || []
        }
      />
    </div>
  );
};

export default Psychology;
