import Labels from '@/components/charts/Labels';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const LabelCloud: React.FunctionComponent = () => {
  const { baseInfo } = useModel('crimeStore.evaluation');

  return (
    <div className={styles.wrap}>
      <Labels data={baseInfo?.character?.map((item) => ({
        name: item.title,
        value: item.value
      })) || []} />
    </div>
  );
};

export default LabelCloud;
