import InfoBlock from '@/components/layout/InfoBlock';
import React from 'react';
import BorderWrap from '../../components/BorderWrap';
import ModuleName from '../../components/ModuleName';
import VitalSigns from './components/VitalSigns';
import ClockInInfo from './components/ClockInInfo';
import Individual from './components/Individual';
import styles from './index.less';
import AbnormalEvent from './components/AbnormalEvent';

const Dangerous: React.FunctionComponent = () => {
  return (
    <InfoBlock title="个体危险性评估">
      <BorderWrap>
        <ModuleName>个体危险性</ModuleName>
        <Individual />
      </BorderWrap>
      <BorderWrap className={styles.marginTop20}>
        <ModuleName>生命特征</ModuleName>
        <VitalSigns />
      </BorderWrap>
      <BorderWrap className={styles.marginTop20}>
        {/* <ModuleName rightContent={<a>{'更多>>'}</a>}>打卡信息</ModuleName> */}
        <ClockInInfo />
      </BorderWrap>
      <BorderWrap className={styles.marginTop20}>
        {/* <ModuleName>异常事件</ModuleName> */}
        <AbnormalEvent />
      </BorderWrap>
    </InfoBlock>
  );
};

export default Dangerous;
