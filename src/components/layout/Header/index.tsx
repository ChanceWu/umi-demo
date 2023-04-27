import type { MenuDataItem } from '@ant-design/pro-layout';
import type { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import React, { useEffect, useState } from 'react';
import ManageHeader from './ManageHeader';

export interface LayoutProps extends HeaderViewProps {
  matchMenuKeys?: string[];
  breadcrumb?: Record<string, MenuDataItem>;
}

const Header: React.FunctionComponent<LayoutProps> = (props) => {
  const { matchMenuKeys, breadcrumb } = props;
  const [info, setInfo] = useState<MenuDataItem>();

  useEffect(() => {
    if (breadcrumb && matchMenuKeys) {
      const currentPath = matchMenuKeys ? matchMenuKeys[matchMenuKeys?.length - 1] : '/';
      const menuInfo = breadcrumb[currentPath];
      setInfo(menuInfo);
    }
  }, [breadcrumb, matchMenuKeys]);

  if (info && info.header === '智能采集汇聚管理系统') {
    return <ManageHeader module="智能采集汇聚管理系统" {...props} />;
  }
  if (info && info.header === '罪犯综合评估系统') {
    return <ManageHeader module="罪犯综合评估系统" {...props} />;
  }
  if (info && info.header === false) {
    return <></>;
  }

  return <></>;
};

export default Header;
