import InfoBlock from '@/components/layout/InfoBlock';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const LabelItem: React.FunctionComponent<{ label: string; value?: string }> = (props) => (
  <div className={props.value === '否' ? styles.labelItem : styles.labelItemActive}>
    <span>{props.label}</span>
    <span>{props.value}</span>
  </div>
);

const BaseInfoExtra: React.FunctionComponent = () => {
  const { baseInfo } = useModel('crimeStore.crimeFile');
  return (
    <InfoBlock title="基础信息">
      <div className={styles.row}>
        <div className={styles.block}>
          <span className={styles.title}>四史</span>
          <div className={styles.labelWrap}>
            <LabelItem label="逃脱史" value={baseInfo?.flee_record} />
            <LabelItem label="吸毒史" value={baseInfo?.drug_record} />
            <LabelItem label="自杀史" value={baseInfo?.commit_suicide_record} />
            <LabelItem label="袭警史" value={baseInfo?.assault_police_record} />
          </div>
        </div>
        <div className={styles.block}>
          <span className={styles.title}>职务犯</span>
          <div className={styles.labelWrap}>
            <LabelItem label="涉枪" value={baseInfo?.is_gun} />
            <LabelItem label="涉毒" value={baseInfo?.is_drug} />
            <LabelItem label="涉黑" value={baseInfo?.is_underworld} />
            <LabelItem label="涉恶" value={baseInfo?.is_evil} />
          </div>
        </div>
      </div>
    </InfoBlock>
  )
}

export default BaseInfoExtra;
