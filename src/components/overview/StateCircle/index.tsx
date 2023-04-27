import React, { useState } from 'react';
import styles from './index.less';
import type { CircleItemProps } from './StateCircleItem';
import CircleItem from './StateCircleItem';

interface IProps {
  list: CircleItemProps[];
  onSelect?: (index: number, item: CircleItemProps) => void;
}

const StateCircle: React.FunctionComponent<IProps> = (props: IProps) => {
  const [current, setCurrent] = useState(0);
  const { list, onSelect } = props;

  const handleClick = (index: number, item: CircleItemProps) => {
    if (onSelect) onSelect(index, item);
    setCurrent(index);
  };

  return (
    <div className={styles.stateCircle}>
      {list.map((item, index) => (
        <CircleItem
          {...item}
          isActive={index === current}
          key={String(index)}
          onClick={() => handleClick(index, item)}
        />
      ))}
    </div>
  );
};

StateCircle.defaultProps = {
  list: [
    { text: '高', color: '#23CEFD', desc: '445人' },
    { text: '高', color: '#23CEFD', desc: '445人' },
    { text: '高', color: '#23CEFD', desc: '445人' },
  ],
};

export default StateCircle;
