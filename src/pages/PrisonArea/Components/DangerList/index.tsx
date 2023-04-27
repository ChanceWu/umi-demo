import React from 'react';
import styles from './index.less';

export type DangerStatusItem = { title: string; color: string; bgColor: string };
export type DangerStatusKey = 'status1' | 'status2' | 'status3' | 'status4';

export const dangerStatusList: Record<DangerStatusKey, DangerStatusItem> = {
  status1: { title: '极高', color: '#6C010E', bgColor: '#6C010E1A' },
  status2: { title: '高度', color: '#E02020', bgColor: '#E020201A' },
  status3: { title: '中度', color: '#C97800', bgColor: '#C978001A' },
  status4: { title: '低度', color: '#258F8D', bgColor: '#258F8D1A' },
};

const DangerList: React.FunctionComponent = () => (
  <div className={styles.dangerList}>
    个体危险性：
    {Object.values(dangerStatusList).map((item, index) => (
      <div className={styles.dangerItem} key={String(index)}>
        <div className={styles.dangerItem_color} style={{ backgroundColor: item.color }}></div>
        {item.title}
      </div>
    ))}
  </div>
);

export default DangerList;
