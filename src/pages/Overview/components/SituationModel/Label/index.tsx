import React from 'react';
import styles from './index.less';

interface IProps {
  children: React.ReactNode;
  color?: string;
}
const Label: React.FunctionComponent<IProps> = ({ children, color }: IProps) => (
  <div className={styles.spanLabel}>
    <div className={styles.circle} style={{ background: color }}></div>
    <span style={{ color }}>{children}</span>
  </div>
);

Label.defaultProps = {
  color: '#00AFFD',
};

export default Label;
