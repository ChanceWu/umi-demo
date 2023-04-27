import ButtonBg from '@/assets/images/common/titleWrap.png';
import React, { useState } from 'react';
import styles from './index.less';

interface ButtonItem {
  key?: string;
  title: string;
}

interface IProp {
  list: ButtonItem[];
  desc?: string | React.ReactNode;
  onSelect?: (key: string, index: number) => void;
}

const TrapezoidButton: React.FunctionComponent<IProp> = (props: IProp) => {
  const [current, setCurrent] = useState(0);
  const { list } = props;

  const handleClick = (key: string, index: number) => {
    setCurrent(index);
    if (props.onSelect) props.onSelect(key, index);
  };

  return (
    <div className={styles.trapeWrap}>
      {list.map((item, index) => (
        <div
          key={item.key || item.title}
          onClick={() => handleClick(item.key || item.title, index)}
        >
          {index === list.length - 1 ? (
            <div
              className={styles.trapezoidButtonLast}
              style={current === index ? { color: '#ffffff' } : { color: '#2F6FB6' }}
            >
              <img src={ButtonBg} alt="buttonbg" />
              <span>{item.title}</span>
            </div>
          ) : (
            <div
              className={styles.trapezoidButton}
              style={current === index ? { color: '#ffffff' } : { color: '#2F6FB6' }}
            >
              <span>{item.title}</span>
            </div>
          )}
        </div>
      ))}
      <span className={styles.desc}>{props.desc}</span>
    </div>
  );
};

export default TrapezoidButton;
