import useMenu2Content from '@/hooks/useMenu2Content';
import { Menu } from 'antd';
import React from 'react';
import styles from './index.less';

const FloorMenu: React.FunctionComponent<any> = (props) => {
  const { menuList, activeKey, scrollTOTop } = useMenu2Content();

  return (
    <div className={styles.wrap}>
      <Menu style={{ width: 90 }} selectedKeys={[activeKey]} mode="inline" {...props}>
        {menuList.map((item) => {
          return <Menu.Item key={item.key} onClick={() => scrollTOTop(item)}>{item.title}</Menu.Item>;
        })}
      </Menu>
    </div>
  );
};

export default FloorMenu;
