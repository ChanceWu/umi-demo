import TrapezoidButton from '@/components/overview/TrapezoidButton/index';
import { Col, Progress, Row } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import Label from './Label';

interface AreaItem {
  title: string;
  num: number;
  total: number;
}

enum Color {
  color1 = '#EF6E37',
  color2 = '#7D5DF4',
  color3 = '#00AFFD',
}
const getProgress = (cur: number, total: number) => {
  return Math.floor((cur / total) * 100);
};

const getColor = (item: AreaItem) => {
  const progress = getProgress(item.num, item.total);
  if (progress > 80 && progress < 100) {
    return Color.color1;
  }
  if (progress === 100) {
    return Color.color2;
  }
  return Color.color3;
};

const SituationModel: React.FunctionComponent = () => {
  const [data] = useState<AreaItem[]>([
    { title: '一监区', num: 0, total: 200 },
    { title: '二监区', num: 100, total: 200 },
    { title: '三监区', num: 120, total: 200 },
    { title: '四监区', num: 12, total: 200 },
    { title: '五监区', num: 25, total: 200 },
    { title: '六监区', num: 56, total: 200 },
    { title: '七监区', num: 100, total: 200 },
    { title: '八监区', num: 200, total: 200 },
    { title: '九监区', num: 198, total: 200 },
    { title: '十监区', num: 32, total: 200 },
    { title: '十一监区', num: 122, total: 200 },
    { title: '十二监区', num: 134, total: 200 },
    { title: '十三监区', num: 65, total: 200 },
  ]);

  return (
    <div className={styles.wrap}>
      <TrapezoidButton
        list={[{ title: '各监区关押犯人情况' }]}
        desc={
          <div className={styles.descWrap}>
            <Label color={Color.color3}>正常</Label>
            <Label color={Color.color1}>预警</Label>
            <Label color={Color.color2}>满员</Label>
          </div>
        }
      />

      <Row className={styles.row} gutter={[10, 5]}>
        {data.map((item, index) => (
          <Col span={12} key={String(index)}>
            <div className={styles.progressWrap}>
              <Label color={getColor(item)}>{item.title}</Label>
              <div className={styles.progressComWrap}>
                <Progress
                  percent={getProgress(item.num, item.total)}
                  strokeColor={getColor(item)}
                  showInfo={false}
                  strokeWidth={15}
                  trailColor="rgba(0,102,227,0.2)"
                />
                {/* <span className={styles.numText}>
                  {item.num}人
                </span> */}
              </div>
              <span className={styles.progressLabel} style={{ color: getColor(item) }}>
                {item.num}人/{getProgress(item.num, item.total)}%
              </span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SituationModel;
