import React from 'react';
import ChangeTable from './ChangeTable';
import CompletionRate from './CompletionRate';
import styles from './index.less';

const LaborSituation: React.FunctionComponent = () => {
  return (
    <div>
      <div className={styles.row}>
        <ChangeTable />
        <CompletionRate />
      </div>
    </div>
  );
};

export default LaborSituation;
