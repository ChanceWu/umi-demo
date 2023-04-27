import Relation from '@/components/charts/Relation';
import React from 'react';
import styles from './index.less';

// 计算gridArea, 高度基准可能会变 hbs
const getGridArea = (v: string, hbs: number = 1) => {
  const arr = v.replaceAll(' ', '').split('/');
  const format = (cur: string) => {
    return (Number(cur) - 1) * hbs + 1;
  };
  return `${format(arr[0])} / ${arr[1]} / ${format(arr[2])} / ${arr[3]}`;
};

const CrimePanorama: React.FunctionComponent = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.block} style={{ gridArea: getGridArea('1 / 1 / 5 / 3') }}></div>
      <div className={styles.block} style={{ gridArea: getGridArea('1 / 3 / 10 / 7') }}></div>
      <div className={styles.block} style={{ gridArea: getGridArea('5 / 1 / 9 / 3') }}></div>
      <div className={styles.block} style={{ gridArea: getGridArea('9 / 1 / 14 / 3') }}></div>
      <div className={styles.block} style={{ gridArea: getGridArea('10 / 3 / 14 / 5') }}></div>
      <div className={styles.block} style={{ gridArea: getGridArea('10 / 5 / 14 / 7') }}></div>
      <div className={styles.block} style={{ gridArea: getGridArea('14 / 1 / 19 / 4') }}></div>
      <div className={styles.block} style={{ gridArea: getGridArea('14 / 4 / 19 / 7') }}>
        <Relation />
      </div>
    </div>
  );
};

export default CrimePanorama;
