import { formatValue } from '@/utils/utils';
import { Tabs } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const { TabPane } = Tabs;

interface MatrixItem {
  title: string;
  value?: string;
  flex?: 2;
}

interface ColorItem {
  borderColor: string;
  fontColor: string;
  bgColor: string;
}

const colorList: ColorItem[] = [
  {
    borderColor: '#A4BAFD',
    fontColor: '#1B4192',
    bgColor: '#F0F5FF',
  },
  {
    borderColor: '#95CD7B',
    fontColor: '#509D2D',
    bgColor: '#F3FFEE',
  },
  {
    borderColor: '#E4B6F8',
    fontColor: '#722D92',
    bgColor: '#FDF7FF',
  },
  {
    borderColor: '#F5A2A2',
    fontColor: '#D52E2D',
    bgColor: '#FFF4F3',
  },
  {
    borderColor: '#F3D083',
    fontColor: '#C08706',
    bgColor: '#FFF6E3',
  },
  {
    borderColor: '#FFB79B',
    fontColor: '#B14316',
    bgColor: '#FFF0E9',
  },
  {
    borderColor: '#7CDAFF',
    fontColor: '#2E96BE',
    bgColor: '#F7FDFF',
  },
];

const Matrix: React.FunctionComponent<{ list: MatrixItem[] }> = ({ list }) => (
  <div className={styles.matrix}>
    {list.map((item, index) => {
      const colorItem = colorList[index % 7];
      const style: React.CSSProperties = {
        border: `1px solid ${colorItem.borderColor}`,
        background: colorItem.bgColor,
        color: colorItem.fontColor,
      };
      return (
        <div
          className={styles.matrixItem}
          key={String(index)}
          style={
            item.flex
              ? { gridColumnStart: 1, gridColumnEnd: item.flex + 1, ...style }
              : { ...style }
          }
        >
          <span>{item.title}</span>
          <span>{formatValue(item.value)}</span>
        </div>
      );
    })}
  </div>
);

interface IProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ExtraInfo: React.FunctionComponent<IProps> = ({ ...rest }) => {
  const { proBaseInfoExt } = useModel('evaluation.job');

  return (
    <div className={styles.extraWrap} {...rest}>
      <Tabs size="small" defaultActiveKey="adapt">
        <TabPane tab="性格及心理" key="adapt">
          <Matrix
            list={[
              { title: '聪慧程度', value: proBaseInfoExt.intelligence },
              { title: '性格', value: proBaseInfoExt.character_feature },
              { title: '冲动', value: proBaseInfoExt.impulse },
              { title: '暴力倾向', value: proBaseInfoExt.violence },
              { title: '自卑', value: proBaseInfoExt.low_esteem },
              { title: '焦虑', value: proBaseInfoExt.anxious },
              { title: '心理疾病史', value: proBaseInfoExt.heart_medical_his, flex: 2 },
            ]}
          />
        </TabPane>
        <TabPane tab="职业技能与素养" key="2">
          <Matrix
            list={[
              { title: '劳动能力等级', value: proBaseInfoExt.labor_level },
              { title: '劳动积分', value: proBaseInfoExt.labor_point },
              { title: '文化程度', value: proBaseInfoExt.cultural_level },
              { title: '从业经历', value: proBaseInfoExt.business_his },
              { title: '技能/特长', value: proBaseInfoExt.special_skill },
              { title: '劳动奖励', value: proBaseInfoExt.labor_reward },
              { title: '劳动价值观', value: proBaseInfoExt.labor_values },
              { title: '劳动职业素养', value: proBaseInfoExt.professionalism },
            ]}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ExtraInfo;
