import { formatValue } from '@/utils/utils';
import React from 'react';
import styles from './index.less';

interface IProp {
  date?: string;
  title?: string;
  rightContent?: React.ReactNode | string;
  subLabel?: string;
}

const TitleBar: React.FunctionComponent<IProp> = ({ date, title, rightContent, subLabel }) => {
  return (
    <div className={styles.header}>
      <span>评估时间：{formatValue(date)}</span>
      <h2>
        {title}
        {subLabel && <span className={styles.subLable}>{subLabel}</span>}
      </h2>
      <div className={styles.rightContent}>{rightContent}</div>
    </div>
  );
};

export default TitleBar;
