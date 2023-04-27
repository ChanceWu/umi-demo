import InfoBlock from '@/components/layout/InfoBlock';
import React from 'react';
import { useModel } from 'umi';
import BorderWrap from '../../components/BorderWrap';
import ModuleName from '../../components/ModuleName';
import BodyState from './components/BodyState';
import Cognition from './components/Cognition';
import LabelCloud from './components/LabelCloud';
import Psychology from './components/Psychology';
import styles from './index.less';

const BaseEvaluation: React.FunctionComponent = () => {
  const { baseInfo } = useModel('crimeStore.evaluation');

  return (
    <InfoBlock
      title="基础评估"
      rightContent={<div className={styles.rightDate}>评估时间：{baseInfo?.assess_date}</div>}
    >
      <div className={styles.baseWrap}>
        <BorderWrap>
          <ModuleName>身体状况</ModuleName>
          <div className={styles.flexRow}>
            <BodyState />
            <Cognition />
          </div>
        </BorderWrap>
        <div className={styles.grid}>
          <BorderWrap>
            <ModuleName>性格特征</ModuleName>
            <LabelCloud />
          </BorderWrap>
          <BorderWrap>
            <ModuleName>心理特征</ModuleName>
            <Psychology />
          </BorderWrap>
        </div>
      </div>
    </InfoBlock>
  );
};

export default BaseEvaluation;
