import Photo from '@/components/common/Photo';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const BaseInfoModule: React.FunctionComponent = () => {
  const { baseInfo } = useModel('crimeStore.crimeFile');
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
            <span>性别：</span>
            <span>{baseInfo?.sex}</span>
          </div>
          <div className={styles.infoItem}>
            <span>民族：</span>
            <span>{baseInfo?.nation}</span>
          </div>
          <div className={styles.infoItem}>
            <span>出生日期：</span>
            <span>{baseInfo?.birthday}</span>
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
            <span>刑期起日：</span>
            <span>{baseInfo?.DQXQQR}</span>
          </div>
          <div className={styles.infoItem}>
            <span>刑期止日：</span>
            <span>{baseInfo?.DQXQZR}</span>
          </div>
          <div className={styles.infoItem}>
            <span>总减刑期：</span>
            <span>{baseInfo?.sub_all}</span>
          </div>
          <div className={styles.infoItem}>
            <span>分押等级：</span>
            <span style={{ fontWeight: 'bold' }}>{baseInfo?.FYLXNAME}</span>
          </div>
          <div className={styles.infoItem}>
            <span>个性特征：</span>
            <span>{baseInfo?.character_feature}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfoModule;
