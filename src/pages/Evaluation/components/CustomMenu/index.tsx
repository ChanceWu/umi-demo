import type { MenuItemInter } from '@/pages/Converge/data/menus';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface IProps extends MenuProps {
  menus: MenuItemInter[];
  defaultSelectedKey: string;
}

const CustomMenu: React.FunctionComponent<IProps> = (props) => {
  const { menus, defaultSelectedKey, ...rest } = props;
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    setKeys([defaultSelectedKey]);
  }, [defaultSelectedKey]);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <Menu
          style={{ width: 208 }}
          mode="inline"
          selectedKeys={keys}
          onSelect={({ selectedKeys }) => setKeys(selectedKeys)}
          {...rest}
        >
          {menus.map((item) => {
            return (
              <Menu.Item icon={item.icon && item.icon()} key={item.key}>
                {item.title}
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};

export default CustomMenu;
