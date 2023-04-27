// import mapImg from '@/assets/images/overview/map.png';
import { Popover } from 'antd';
import React from 'react';
import { history } from 'umi';
import BuildItem, { BuildType } from './BuildItem';
import styles from './index.less';
import PopInfo from './PopInfo';

type BuildState = {
  x: number;
  y: number;
  type: BuildType;
  text: string;
};
const buildList: BuildState[] = [
  // 第四列
  {
    x: 80,
    y: 20,
    type: BuildType.Area,
    text: '13监区',
  },
  {
    x: 80,
    y: 45,
    type: BuildType.Area,
    text: '12监区',
  },
  {
    x: 80,
    y: 70,
    type: BuildType.Area,
    text: '11监区',
  },
  // 第三列
  {
    x: 60,
    y: 45 - 15 * 2,
    type: BuildType.Area,
    text: '10监区',
  },
  {
    x: 60,
    y: 45 - 15,
    type: BuildType.Area,
    text: '8监区',
  },
  {
    x: 60,
    y: 45,
    type: BuildType.Area,
    text: '6监区',
  },
  {
    x: 60,
    y: 45 + 15,
    type: BuildType.Area,
    text: '4监区',
  },
  {
    x: 60,
    y: 45 + 15 * 2,
    type: BuildType.Area,
    text: '2监区',
  },
  // 第二列
  {
    x: 35,
    y: 10,
    type: BuildType.Retrofit,
    text: '劳动改造工作区',
  },
  {
    x: 35,
    y: 40,
    type: BuildType.Education,
    text: '教育中心',
  },
  {
    x: 35,
    y: 63,
    type: BuildType.Playground,
    text: '操场',
  },
  {
    x: 35,
    y: 86,
    type: BuildType.Door,
    text: 'A/B门',
  },
  // 第一列
  {
    x: 10,
    y: 45 - 15 * 2,
    type: BuildType.Area,
    text: '9监区',
  },
  {
    x: 10,
    y: 45 - 15,
    type: BuildType.Area,
    text: '7监区',
  },
  {
    x: 10,
    y: 45,
    type: BuildType.Area,
    text: '5监区',
  },
  {
    x: 10,
    y: 45 + 15,
    type: BuildType.Area,
    text: '3监区',
  },
  {
    x: 10,
    y: 45 + 15 * 2,
    type: BuildType.Area,
    text: '1监区',
  },
];

const Map: React.FunctionComponent = () => {
  const routeToPrison = () => {
    history.push('/overview/prisonArea');
  };

  return (
    <div className={styles.map}>
      {/* <img className={styles.mapBg} src={mapImg} alt="map" /> */}
      {buildList.map((item, index) => (
        <div
          className={styles.build}
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          key={String(index)}
        >
          {item.type === BuildType.Area ? (
            <Popover
              content={<PopInfo />}
              color="rgba(0,0,0,0.9)"
              overlayClassName={styles.infoPop}
              placement="right"
              key={item.x + item.y}
              destroyTooltipOnHide
            >
              <div onClick={() => routeToPrison()}>
                <BuildItem text={item.text} type={item.type} />
              </div>
            </Popover>
          ) : (
            <BuildItem text={item.text} type={item.type} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Map;
