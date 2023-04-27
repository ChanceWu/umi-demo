import Photo from '@/components/common/Photo';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const BaseInfoModule: React.FunctionComponent = () => {
  const { baseInfo } = useModel('crimeStore.evaluation');
  return (
    <div className={styles.baseInfoWrap}>
      <Photo src={baseInfo?.photo} />
      <div className={styles.content}>
        <div className={styles.nameRow}>
          <span>{baseInfo?.name}</span>
          <span className={styles.blackLabel}>{baseInfo?.id}</span>
        </div>
        <div className={styles.infoFlex}>
          <div className={styles.infoItem}>
            <span>年龄：</span>
            <span>{baseInfo?.crime_age}</span>
          </div>
          <div className={styles.infoItem}>
            <span>出生日期：</span>
            <span>{baseInfo?.birthday}</span>
          </div>
          <div className={styles.infoItem}>
            <span>婚姻状况：</span>
            <span>{baseInfo?.marriage_now}</span>
          </div>
          <div className={styles.infoItem}>
            <span>学历：</span>
            <span>{baseInfo?.cultural_level}</span>
          </div>
          <div className={styles.infoItem}>
            <span>危险等级：</span>
            <span className={styles.blueBlock}>{baseInfo?.danger_level}</span>
          </div>
          <div className={styles.infoItem}>
            <span>罪名：</span>
            <span>{baseInfo?.crime_name}</span>
          </div>
          <div className={styles.infoItem}>
            <span>原判刑期：</span>
            <span>{baseInfo?.xq}</span>
          </div>
          <div className={styles.infoItem}>
            <span>剩余刑期：</span>
            <span>{baseInfo?.xq_remain}</span>
          </div>
          <div className={styles.infoItem}>
            <span>刑期起日：</span>
            <span>{baseInfo?.DQXQQR}</span>
          </div>
          <div className={styles.infoItem}>
            <span>刑期止日：</span>
            <span>{baseInfo?.DQXQZR}</span>
          </div>
          <div className={styles.infoItem}>
            <span>前科情况：</span>
            <span>{baseInfo?.crime_record_count}</span>
          </div>
          <div className={styles.infoItem}>
            <span>捕前职业：</span>
            <span>{baseInfo?.profession_bq}</span>
          </div>
          <div className={styles.infoItem}>
            <span>技能特长：</span>
            <span>{baseInfo?.special_skill}</span>
          </div>
          <div className={styles.infoItem}>
            <span>历史狱内改造情况：</span>
            <span>{baseInfo?.change_his}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfoModule;
