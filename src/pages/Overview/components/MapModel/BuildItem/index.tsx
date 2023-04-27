import React from 'react';
import styles from './index.less';

export enum BuildType {
  Area = 'area', // 监区
  Playground = 'playground', // 操场
  Door = 'door', // 大门
  Education = 'education', // 教育中心
  Retrofit = 'retrofit', // 劳动改造工作区
}

const configs: Record<
  BuildType,
  { bg: string; icon?: string; width: number; textOffsetTop: number }
> = {
  [BuildType.Area]: {
    bg: require('@/assets/images/overview/map/bg4.png'),
    icon: require('@/assets/images/overview/map/icon4.png'),
    width: 68,
    textOffsetTop: -10,
  },
  [BuildType.Playground]: {
    bg: require('@/assets/images/overview/map/bg1.png'),
    icon: require('@/assets/images/overview/map/icon1.png'),
    width: 90,
    textOffsetTop: -10,
  },
  [BuildType.Door]: {
    bg: require('@/assets/images/overview/map/bg5.png'),
    width: 90,
    textOffsetTop: 5,
  },
  [BuildType.Education]: {
    bg: require('@/assets/images/overview/map/bg3.png'),
    icon: require('@/assets/images/overview/map/icon3.png'),
    width: 90,
    textOffsetTop: -35,
  },
  [BuildType.Retrofit]: {
    bg: require('@/assets/images/overview/map/bg2.png'),
    icon: require('@/assets/images/overview/map/icon2.png'),
    width: 90,
    textOffsetTop: -40,
  },
};

interface IProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: BuildType;
  text: string;
}

const BuildItem: React.FunctionComponent<IProps> = (props) => (
  <div className={styles.build} style={{ width: configs[props.type].width }}>
    <div className={styles.textContent} style={{ top: configs[props.type].textOffsetTop }}>
      <span>{props.text}</span>
      <img src={configs[props.type].icon} />
    </div>
    <img src={configs[props.type].bg} />
  </div>
);

export default BuildItem;
