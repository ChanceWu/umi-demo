// https://umijs.org/config/
import { defineConfig } from 'umi';
import px2vw from 'postcss-px-to-viewport-with-include';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV, NODE_ENV } = process.env;

const pathPrefix = NODE_ENV === 'development' ? '/' : '/comprehensive-assessment-system/';

export default defineConfig({
  hash: true,
  base: pathPrefix,
  publicPath: pathPrefix,
  antd: { config: {} },
  dva: {
    hmr: true,
  },
  layout: {
    name: '',
    locale: false,
    siderWidth: 208,
    fixSiderbar: false,
    logo: `${pathPrefix}logo.png`,
    collapsed: false,
    collapsedButtonRender: false,
    ...defaultSettings,
  },
  locale: {
    antd: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  esbuild: {},
  // mfsu: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // exportStatic: {},
  cssModulesTypescriptLoader: {
    mode: 'emit',
  },
  extraPostCSSPlugins: [
    px2vw({
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 1920, // UI设计稿的宽度
      unitPrecision: 5, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: [], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      include: [/CrimeEvaluation[\/\\]modules/i, /crime[\/\\]StateBlock/i],
      landscape: false, // 是否处理横屏情况
    }),
  ],
});
