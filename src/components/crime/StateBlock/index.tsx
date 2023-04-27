import React from 'react';
import styles from './index.less';

interface IProps {
  state: string;
  value: string | number;
  desc: string;
  color?: 'red' | 'green';
}

const StateBlock: React.FunctionComponent<IProps> = (props) => {
  return (
    <div
      className={styles.info}
      style={{
        backgroundImage: `url(${
          props.color === 'red'
            ? require('@/assets/images/evaluation/dagerVBg.png')
            : require('@/assets/images/evaluation/dagerVBgGreen.png')
        })`,
        color: props.color === 'red' ? '#E02020': '#40A3A1'
      }}
    >
      <span>{props.state}</span>
      <span>{props.value}</span>
      <span>{props.desc}</span>
    </div>
  );
};

StateBlock.defaultProps = {
  color: 'red',
};

export default StateBlock;
