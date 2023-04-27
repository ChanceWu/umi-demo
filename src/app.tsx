import type { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message, notification } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import React from 'react';
import type { RequestConfig } from 'umi';
import { history } from 'umi';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import Header from './components/layout/Header/index';
import { UserApi } from './services';
import { redirectLogin } from './utils/utils';

export interface InitialState {
  settings: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  loadedFillMenuPage: number;
  collapsed: boolean | undefined;
}

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<InitialState> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await UserApi.queryCurrent();
      return currentUser;
    } catch (error) {
      redirectLogin();
    }
    return undefined;
  };

  const currentUser = await fetchUserInfo();
  const currentPage = 1;

  return {
    collapsed: undefined,
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
    loadedFillMenuPage: currentPage,
  };
}

export const layout = ({ initialState }: { initialState: InitialState }): BasicLayoutProps => {
  const initState: BasicLayoutProps = {
    headerRender: (props) => <Header {...props} />,
    /* 登录页去掉侧边 */
    siderWidth: ['/login', '/pc/enterprise'].includes(history.location.pathname) ? 0 : undefined,
    disableContentMargin: false,
    onPageChange: () => {
      const { currentUser } = initialState;
      // 如果没有登录，重定向到 login
      if (!currentUser) {
        redirectLogin();
      }
      if (!currentUser) redirectLogin();
    },
    /* 移除默认面包屑 */
    breadcrumbRender: () => undefined,
    ...initialState.settings,
    contentStyle: {},
  };

  return initState;
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

let isNotAuthMessageShowing = false;
/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const { status } = response;

    /* 避免重复提示 */
    if (response && response.status === 401) {
      if (!isNotAuthMessageShowing && history.location.pathname !== '/login') {
        isNotAuthMessageShowing = true;
        message.error('您尚未登录或登录已过期，请先登录');
        // history.replace('/login');
        redirectLogin();
      }
    } else {
      const { data } = error;
      const errorText =
        data?.errorMsg ||
        data?.message ||
        codeMessage[response.status] ||
        response.statusText ||
        '网络请求异常!';

      notification.error({
        message: `请求错误 ${status}`,
        description: errorText,
      });
    }
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader =
    url.includes('ficus') || url.includes('server')
      ? { Authorization: 'Bearer 1bf99a2d-8aaf-4670-b674-4539b4ccd1f3' }
      : undefined;
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader || options.headers },
  };
};

export const request: RequestConfig = {
  prefix: '/comprehensive-assessment-system',
  requestInterceptors: [authHeaderInterceptor],
  errorHandler,
};

// 配置antd
export const antd = {
  config: {
    locale: zhCN, // 引用antd的语言包
  },
};
