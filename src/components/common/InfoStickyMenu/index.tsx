import useMenu2Content from '@/hooks/useMenu2Content';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import styles from './index.less';

interface IProps {
  stickyTop?: number;
}

const InfoStickyMenu: React.FunctionComponent<IProps & MenuProps> = ({ stickyTop, ...props }) => {
  const { menuList, activeKey, scrollTOTop } = useMenu2Content();

  return (
    <div className={styles.wrap} style={{top: stickyTop || 80}}>
      <Menu style={{ width: 209 }} selectedKeys={[activeKey]} mode="inline" {...props}>
        {menuList.map((item) => {
          return (
            <Menu.Item key={item.key} onClick={() => scrollTOTop(item)}>
              {item.title}
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default InfoStickyMenu;
