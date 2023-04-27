import { Spin } from 'antd';
import React from 'react';
import styles from './index.less';

interface IProps {
  baseLoading: boolean;
  baseInfo: PrisonArea.Base;
}
const DataStatistics: React.FunctionComponent<IProps> = ({ baseInfo, baseLoading }) => {
  return (
    <div className={styles.row}>
      <div className={styles.block}>
        {baseLoading && <Spin className={styles.blockLoading} spinning={baseLoading} />}
        <div className={styles.blockItem}>
          <span>{baseInfo.in_registered || 0}</span>
          <span className={styles.img_zaice}>在册犯人</span>
        </div>
        <div className={styles.colHr}></div>
        <div className={styles.blockItem}>
          <span>{baseInfo.in_custody || 0}</span>
          <span className={styles.img_zaiya}>在押犯人</span>
        </div>
        <div className={styles.blockItem}>
          <span>{baseInfo.exec_out_prison || 0}</span>
          <span className={styles.img_jianwai}>监外执行</span>
        </div>
        <div className={styles.blockItem}>
          <span>{baseInfo.in_Hospital || 0}</span>
          <span className={styles.img_zhuyuan}>住院犯人</span>
        </div>
        <div className={styles.blockItem}>
          <span>{baseInfo.exec_out_prison || 0}</span>
          <span className={styles.img_zaitao}>在逃犯人</span>
        </div>
        <div className={styles.blockItem}>
          <span>{baseInfo.visit_family_out_prison || 0}</span>
          <span className={styles.img_tanqin}>离监探亲</span>
        </div>
      </div>
      <div className={styles.block}>
        {baseLoading && <Spin className={styles.blockLoading} spinning={baseLoading} />}
        {/* <div>罪犯年龄段分布</div> */}
        <div className={`${styles.blockItem} ${styles.circle} ${styles.circle_blue}`}>
          <span className={styles.num}>{baseInfo.age_MIN_18 || 0}</span>
          <span className={styles.age}>18岁以下</span>
        </div>
        <div className={`${styles.blockItem} ${styles.circle} ${styles.circle_green}`}>
          <span className={styles.num}>{baseInfo.age_18_30 || 0}</span>
          <span className={styles.age}>18-30岁</span>
        </div>
        <div className={`${styles.blockItem} ${styles.circle} ${styles.circle_yellow}`}>
          <span className={styles.num}>{baseInfo.age_31_45 || 0}</span>
          <span className={styles.age}>31-45岁</span>
        </div>
        <div className={`${styles.blockItem} ${styles.circle} ${styles.circle_green}`}>
          <span className={styles.num}>{baseInfo.age_46_60 || 0}</span>
          <span className={styles.age}>46-60岁</span>
        </div>
        <div className={`${styles.blockItem} ${styles.circle} ${styles.circle_blue}`}>
          <span className={styles.num}>{(baseInfo.age_61_80 || 0) + (baseInfo.age_max_80 || 0)}</span>
          <span className={styles.age}>61岁以上</span>
        </div>
      </div>
    </div>
  );
};

export default DataStatistics;
