import InfoBlock from '@/components/layout/InfoBlock';
import React from 'react';
import BorderWrap from '../../components/BorderWrap';
import ModuleName from '../../components/ModuleName';
import LaborSituation from './components/LaborSituation';
import LaborLabels from './components/LaborLabels';
import Recommend from './components/Recommend';
import styles from './index.less';

const Profession: React.FunctionComponent = () => {
  return (
    <InfoBlock title="职业技术能力评估">
      <BorderWrap>
        <ModuleName>推荐劳动工种</ModuleName>
        <Recommend />
      </BorderWrap>
      <BorderWrap className={styles.marginTop20}>
        <ModuleName>劳动情况</ModuleName>
        <LaborSituation />
      </BorderWrap>
      <BorderWrap className={styles.marginTop20}>
        <ModuleName>职业技能标签</ModuleName>
        <LaborLabels />
      </BorderWrap>
    </InfoBlock>
  );
};

export default Profession;
