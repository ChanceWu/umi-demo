import React, { useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import MoreRecModal from './MoreRecModal';

const Recommend: React.FunctionComponent = () => {
  const { technolog } = useModel('crimeStore.evaluation');
  const [moreVisible, setMoreVisible] = useState<boolean>(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.rec}>
        <span>当前工种</span>
        <span>{technolog?.current_work}</span>
      </div>
      <div className={styles.rec}>
        <span>推荐工种</span>
        <span>{technolog?.other_work ? technolog?.other_work[0]?.recommend_work: ''}</span>
      </div>
      <div className={styles.btn}>
        <a onClick={() => setMoreVisible(true)}>更多<br/>推荐</a>
      </div>
      <MoreRecModal propData={technolog?.other_work} visible={moreVisible} onCancel={() => setMoreVisible(false)} />
    </div>
  );
};

export default Recommend;
