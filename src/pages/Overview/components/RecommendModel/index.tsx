import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import React, { useState } from 'react';
import styles from './index.less';

interface NumberData {
  key?: string;
  value: number;
  label: string;
}

const RecommendModel: React.FunctionComponent = () => {
  const [data] = useState<NumberData[][]>([
    [
      { label: '在册人数', value: 1234 },
      { label: '在押犯人', value: 2839 },
    ],
    [
      { label: '监外执行', value: 13 },
      { label: '在逃', value: 0 },
      { label: '离监探亲', value: 4 },
    ],
    [
      { label: '住院犯人', value: 6 },
      { label: '在外住院', value: 6 },
    ],
    [
      { label: '入监人数', value: 214 },
      { label: '出监人数', value: 232 },
    ],
  ]);

  return (
    <div className={styles.wrap}>
      <TrapezoidButton list={[{ title: '监犯人数统计' }]} desc="单位：人" />
      <div className={styles.summaryWrap}>
        {data.map((arr, index) => (
          <React.Fragment key={String(index)}>
            {arr.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className={styles.summaryItem} key={`${index}_${i}`}>
                <span>{item.value}</span>
                <div className={styles.label}>{item.label}</div>
              </div>
            ))}
            {index !== data.length - 1 && <div className={styles.colHr}></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RecommendModel;
