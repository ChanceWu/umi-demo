import type { MenuDataItem } from '@ant-design/pro-layout';
import React from 'react';
import { useHistory } from 'umi';
import type { LayoutProps } from '../index';
import styles from './index.less';
import MenuItem from './MenuItem/index';
import RightContent from './RightContent/index';

const ManageHeader: React.FunctionComponent<LayoutProps & {
  module: string
}> = (props) => {
  const { menuData, matchMenuKeys } = props;
  const history = useHistory();
  const isActive = (menu: MenuDataItem) => {
    if (matchMenuKeys?.includes(String(menu.key))) {
      return true;
    }
    return false;
  };
  const routeTo = (path?: string) => {
    if (history && path && !matchMenuKeys?.includes(String(path))) {
      const url = new URL(window.location.href);
      history.push({
        pathname: path,
        search: url.search,
      });
    }
  };
  return (
    <div className={styles.headerWrap}>
      <div className={styles.logoTitle}>
         <h1>{props.module}</h1>
      </div>
      <div className={styles.headerMenu}>
        {menuData &&
          menuData.map((item) => {
            return (
              item.name &&
              item.header &&
              item.header === props.module && (
                <div className={styles.headerItem} key={item.key}>
                  <MenuItem
                    active={isActive(item)}
                    title={item.name}
                    key={item.key}
                    onClick={() => routeTo(item.path)}
                  />
                </div>
              )
            );
          })}
      </div>
      <RightContent />
    </div>
  );
};

export default ManageHeader;
