import { redirectLogin } from '@/utils/utils';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useModel } from 'umi';
import styles from './index.less';

const AuthorizeRedirect: React.FC = () => {
  const { initialState, loading } = useModel('@@initialState');
  const history = useHistory();

  useEffect(() => {
    if (!initialState?.currentUser) {
      redirectLogin();
    } else {
      history.push('/');
    }
  }, [initialState?.currentUser]);

  return (
    <div className={styles.container}>
      <Spin size="large" tip={loading ? '加载中' : '正在跳转'}></Spin>
    </div>
  );
};
export default AuthorizeRedirect;
