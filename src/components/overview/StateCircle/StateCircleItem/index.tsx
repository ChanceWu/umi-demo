import React from 'react';
import styles from './index.less';

export interface CircleItemProps {
  text?: string;
  color?: string;
  isActive?: boolean;
  desc?: string;
  notActiveOpacity?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const StateCircleItem: React.FunctionComponent<CircleItemProps> = (props: CircleItemProps) => {
  const { color, isActive, text, desc, notActiveOpacity, onClick } = props;

  return (
    <div
      className={styles.circleItem}
      style={{ opacity: isActive ? 1 : notActiveOpacity }}
      onClick={onClick}
    >
      <div style={{ position: 'relative' }}>
        <div className={styles.text} style={{ color }}>
          {text}
        </div>
        <div className={styles.outerCircle} style={{ borderColor: color }}></div>
        <div
          className={styles.interCircle}
          style={{ boxShadow: `0 0 30px 0 ${color}`, borderColor: color }}
        ></div>
        <div className={styles.interBg} style={{ borderColor: color }}></div>
      </div>
      <span className={styles.desc} style={{ color }}>
        {desc}
      </span>
    </div>
  );
};

StateCircleItem.defaultProps = {
  color: '#7C5CF3',
  isActive: false,
  text: '高',
  notActiveOpacity: 0.5,
};

export default StateCircleItem;
