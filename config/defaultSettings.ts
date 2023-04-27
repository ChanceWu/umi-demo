import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  layout: 'mix',
  title: '罪犯综合评估系统',
  headerHeight: 60,
  pwa: false,
  iconfontUrl: '//at.alicdn.com/t/font_2409466_wqevfbig0gj.js',
  splitMenus: true,
};

export default Settings;
