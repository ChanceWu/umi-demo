import type { Route } from '@ant-design/pro-layout/lib/typings';
import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'umi';
import type { MenuItemInter } from '../Converge/data/menus';
import CustomMenu from './components/CustomMenu';
import styles from './index.less';

interface IProps {
  children: React.ReactNode;
  route: Route;
  location: Location;
}

const Evaluation: React.FunctionComponent<IProps> = ({ children, route, location }) => {
  const history = useHistory();
  const menus: MenuItemInter[] =
    route.routes
      ?.filter((item) => item.name)
      .map((item) => {
        return {
          title: item.name || '',
          key: item.path,
          icon: () => item.icon,
        };
      }) || [];

  const handleChange = useCallback(
    ({ key }: { key: string }) => {
      const url = new URL(window.location.href);
      url.searchParams.delete('tab');
      history.push({
        pathname: key,
        search: url.search,
      });
    },
    [history],
  );

  useEffect(() => {
    if (location.pathname === '/evaluation') {
      handleChange({ key: '/evaluation/crimeAgain' });
    }
  }, [location, handleChange]);

  return (
    <div className={styles.wrap}>
      <CustomMenu menus={menus} defaultSelectedKey={location.pathname} onClick={handleChange} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Evaluation;
