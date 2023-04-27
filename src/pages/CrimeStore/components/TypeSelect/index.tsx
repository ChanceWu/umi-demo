import { Tabs } from 'antd';
import React, { useState } from 'react';
import { StoreTypes } from '../../data/useStoreType';
import styles from './index.less';

interface IProps {
  list?: { label: string; value: StoreTypes }[];
  defaultValue?: StoreTypes;
  onSelect?: (value: StoreTypes) => void;
}

const TypeSelect: React.FunctionComponent<IProps> = (props) => {
  const [current, setCurrent] = useState(props.defaultValue);

  const handleClick = (value: any) => {
    if (props.onSelect) {
      props.onSelect(value);
    }
    setCurrent(value);
  };

  return (
    <div className={styles.wrap}>
      <Tabs defaultActiveKey={current} onChange={handleClick}>
        {props.list &&
          props.list.map((item) => <Tabs.TabPane tab={item.label} key={item.value}></Tabs.TabPane>)}
      </Tabs>
    </div>
  );
};

TypeSelect.defaultProps = {
  defaultValue: StoreTypes.All,
  list: [
    { label: '全部', value: StoreTypes.All },
    { label: '新入监', value: StoreTypes.New },
    { label: '重点关注', value: StoreTypes.Follow },
    { label: '主管对象', value: StoreTypes.Main },
  ],
};

export default TypeSelect;
