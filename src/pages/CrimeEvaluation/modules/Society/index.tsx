import InfoBlock from '@/components/layout/InfoBlock';
import React from 'react';
import BorderWrap from '../../components/BorderWrap';
import Individual from './components/Conclusion';
import Multidimensional from './components/Multidimensional';
import styles from './index.less';

const Society: React.FunctionComponent = () => {
  return (
    <InfoBlock title="社会适应性评估">
      <BorderWrap>
        {/* <ModuleName>评估结论</ModuleName> */}
        <Individual />
      </BorderWrap>
      <BorderWrap className={styles.marginTop20}>
        {/* <ModuleName>生命特征</ModuleName> */}
        <Multidimensional />
      </BorderWrap>
    </InfoBlock>
  );
};

export default Society;
