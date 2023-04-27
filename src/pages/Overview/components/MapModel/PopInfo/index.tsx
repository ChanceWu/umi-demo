import criminal from '@/assets/images/overview/criminal.png';
import police from '@/assets/images/overview/police.png';
import Bar from '@/components/charts/Bar';
import Line from '@/components/charts/Line';
import Pie from '@/components/charts/Pie';
import DividingLine from '@/components/common/DividingLine';
import React, { useState } from 'react';
import styles from './index.less';

const PopInfo: React.FunctionComponent = () => {
  const [agesData] = useState([
    { title: '未满18岁', value: 100 },
    { title: '18-30岁', value: 200 },
    { title: '31-45岁', value: 30 },
    { title: '46-60岁', value: 400 },
    { title: '61-80岁', value: 20 },
    { title: '80岁以上', value: 3 },
  ]);
  const [typesData] = useState([
    { title: '盗窃', value: 100 },
    { title: '行凶', value: 150 },
    { title: '自杀', value: 200 },
    { title: '盗窃', value: 170 },
    { title: '行凶', value: 160 },
    { title: '盗窃', value: 30 },
    { title: '自杀', value: 27 },
    { title: '盗窃', value: 192 },
    { title: '自杀', value: 120 },
  ]);
  const [percentData] = useState([
    { name: '有期徒刑', value: 100 },
    { name: '无期徒刑', value: 150 },
    { name: '死缓', value: 200 },
  ]);
  return (
    <div className={styles.popInfo}>
      <span className={styles.title}>本监区人员统计</span>
      <div className={styles.row}>
        <div className={styles.col}>
          <img src={police} alt="police" />
          <div>
            <span>23</span>
            <span>民警人数</span>
          </div>
        </div>
        <div className={styles.col}>
          <img src={criminal} alt="criminal" />
          <div>
            <span>23</span>
            <span>犯人人数</span>
          </div>
        </div>
      </div>
      <DividingLine title="罪犯年龄段分布" showLine={false} />
      <div className={styles.block}>
        <Line data={agesData} />
      </div>
      <DividingLine title="犯罪类型分布" showLine={false} />
      <div className={styles.block}>
        <Bar data={typesData} />
      </div>
      <DividingLine title="押犯结构" showLine={false} />
      <div className={styles.block}>
        <Pie data={percentData} showLegend />
      </div>
    </div>
  );
};

export default PopInfo;
