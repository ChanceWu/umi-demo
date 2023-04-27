import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import React from 'react';
import styles from './index.less';

interface IProps {
  tabs: {title: string, key: string}[]
}

const InfoTabs: React.FunctionComponent<IProps & TabsProps> = ({tabs, ...props}) => {
  return (
    <div className={styles.tabsWrap}>
      <Tabs defaultActiveKey="1" {...props}>
        {
          tabs.map((item) => (
            <Tabs.TabPane tab={item.title} key={item.key}></Tabs.TabPane>
          ))
        }
      </Tabs>
    </div>
  );
};

export default InfoTabs;
