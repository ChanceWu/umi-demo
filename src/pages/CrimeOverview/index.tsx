import { Tabs } from 'antd';
import React, { useState } from 'react';
import CrimeStore from '../CrimeStore';
import PrisonArea from '../PrisonArea';
import styles from './index.less';

const CrimeOverview: React.FunctionComponent = () => {
  const [viewKey, setViewKey] = useState<string>('PrisonView');
  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey={viewKey} onChange={setViewKey} tabBarGutter={10} className="top_tabs">
        <Tabs.TabPane tab="监区视图" key="PrisonView">
          <PrisonArea />
        </Tabs.TabPane>
        <Tabs.TabPane tab="罪犯视图" key="CrimeStore">
          <CrimeStore />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default CrimeOverview;
