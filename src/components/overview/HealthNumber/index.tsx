import { CheckCircleFilled, InfoCircleFilled, WarningFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './index.less';

enum HealthKey {
  Item1 = 'item1',
  Item2 = 'item2',
  Item3 = 'item3',
  Item4 = 'item4',
}

interface HealthItem {
  icon: () => React.ReactNode;
  color: string;
  bgColor: string;
  title: string;
  key: HealthKey;
}

const options: HealthItem[] = [
  {
    icon: () => <WarningFilled />,
    color: 'rgba(239, 55, 98)',
    bgColor: 'rgba(239, 55, 98, 0.2)',
    title: '高危',
    key: HealthKey.Item1,
  },
  {
    icon: () => <WarningFilled />,
    color: 'rgba(239, 110, 55)',
    bgColor: 'rgba(239, 110, 55, 0.2)',
    title: '预警',
    key: HealthKey.Item2,
  },
  {
    icon: () => <InfoCircleFilled />,
    color: 'rgba(55, 178, 239)',
    bgColor: 'rgba(55, 178, 239, 0.2)',
    title: '亚健康',
    key: HealthKey.Item3,
  },
  {
    icon: () => <CheckCircleFilled />,
    color: 'rgba(55, 83, 239)',
    bgColor: 'rgba(55, 83, 239, 0.2)',
    title: '健康',
    key: HealthKey.Item4,
  },
];

interface IProps {
  data?: Record<HealthKey, number>;
  onClick?: (key: string) => void;
}

const HealthNumber: React.FunctionComponent<IProps> = ({ data, onClick }) => {
  const [current, setCurret] = useState(0);

  const handleClick = (key: HealthKey, index: number) => {
    if (onClick) onClick(key);
    setCurret(index);
  };

  return (
    <div className={styles.healthNumber}>
      {options.map((item, index) => (
        <div
          className={styles.healthNumberItem}
          key={String(index)}
          style={{ backgroundColor: item.bgColor, opacity: current === index ? 1 : 0.5 }}
          onClick={() => handleClick(item.key, index)}
        >
          <div style={{ color: item.color }}>
            {item.icon()}
            <span>{item.title}</span>
          </div>
          <span>{data && data[item.key]}</span>
        </div>
      ))}
    </div>
  );
};

HealthNumber.defaultProps = {
  data: {
    item1: 100,
    item2: 200,
    item3: 300,
    item4: 400,
  },
};

export default HealthNumber;
