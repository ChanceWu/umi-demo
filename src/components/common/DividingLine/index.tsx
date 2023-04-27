import React from 'react';
import styles from './index.less';

interface IProps {
  title?: string;
  style?: React.CSSProperties;
  showLine?: boolean;
}

const DividingLine: React.FunctionComponent<IProps> = (props: IProps) => (
  <div className={styles.dividing} style={props.style}>
    <span>{props.title || ''}</span>
    {props.showLine && <div className={styles.hr}></div>}
  </div>
);

DividingLine.defaultProps = {
  showLine: true,
};

export default DividingLine;
