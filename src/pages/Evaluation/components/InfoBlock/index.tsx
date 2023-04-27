import React from 'react';
import styles from './index.less';

interface IProps {
  title?: string;
  children?: React.ReactNode;
  desc?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
}

const InfoBlock: React.FunctionComponent<IProps> = (props) => (
  <div className={`${styles.wrap} ${props.className}`} style={props.style}>
    {props.title && (
      <div className={styles.header} style={props.headerStyle}>
        <div className={styles.title}>{props.title}</div>
        <div>{props.desc}</div>
      </div>
    )}
    <div className={styles.content}>{props.children}</div>
  </div>
);

export default InfoBlock;
