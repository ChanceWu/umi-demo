import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import React from 'react';
import menus from '../../data/menus';
import styles from './index.less';

const { SubMenu } = Menu;

const CustomMenu: React.FunctionComponent<MenuProps> = (props) => {
  return (
    <div className={styles.wrap}>
      <Menu style={{ width: 208 }} defaultSelectedKeys={['1-1']} mode="inline" {...props}>
        {menus.map((item) => {
          if (item.children && item.children.length)
            return (
              <SubMenu key={item.key} title={item.title}>
                {item.children.map((d) => (
                  <Menu.Item key={d.key}>{d.title}</Menu.Item>
                ))}
              </SubMenu>
            );
          return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
        })}
      </Menu>
    </div>
  );
};

export default CustomMenu;
