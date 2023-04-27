import useQueryValue from '@/hooks/useQueryValue';
import { Tabs } from 'antd';
import React from 'react';
import HospitalRisk from './HospitalRisk';

const { TabPane } = Tabs;

const Health: React.FunctionComponent = () => {
  const [tabValue, setTabValue] = useQueryValue('tab', 'adapt');

  return (
    <Tabs size="small" defaultActiveKey={tabValue} onChange={setTabValue}>
      <TabPane tab="住院风险评估（待上线）" key="hospitalized">
        <HospitalRisk />
      </TabPane>
      <TabPane tab="急性及致命性疾病风险评估（待上线）" key="2" disabled>
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  );
};

export default Health;
