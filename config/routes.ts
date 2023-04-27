import { Route } from '@ant-design/pro-layout/lib/typings';

const routes: Route[] = [
  { path: '/', redirect: '/crimeOverview' },
  // 废弃，大屏
  {
    path: '/overview',
    menuRender: false,
    header: 'header1',
    name: '数据总览',
    component: '../layout/Block.tsx',
    routes: [
      { path: '/overview', redirect: '/overview/main' },
      {
        path: '/overview/main',
        component: './Overview/index.tsx',
      },
    ],
  },
  // 罪犯综合评估系统
  {
    path: '/crimeOverview',
    menuRender: false,
    name: '罪犯总览',
    header: '罪犯综合评估系统',
    routes: [
      { path: '/crimeOverview', redirect: '/crimeOverview/index' },
      {
        path: '/crimeOverview/index',
        name: '犯罪总览',
        component: './CrimeOverview/index.tsx'
      },
      {
        path: '/crimeOverview/prisonArea',
        name: '监区视图',
        component: './PrisonArea/index.tsx',
      },
      {
        path: '/crimeOverview/crimeStore',
        name: '罪犯视图',
        component: './CrimeStore/index.tsx',
      },
      {
        path: '/crimeOverview/evaluation',
        // name: '评估页面',
        component: './Evaluation/index.tsx',
        routes: [
          {
            path: '/crimeOverview/evaluation/crimeAgain',
            name: '再犯罪预测评估',
            icon: 'AuditOutlined',
            component: './Evaluation/CrimeAgain/index.tsx',
          },
          // {
          //   path: '/evaluation/health',
          //   name: '身心健康评估',
          //   icon: 'AuditOutlined',
          //   component: './Evaluation/Health/index.tsx',
          // },
          {
            path: '/crimeOverview/evaluation/skill',
            name: '职业技术能力评估',
            icon: 'AuditOutlined',
            component: './Evaluation/Skill/index.tsx',
          },
        ],
      },
      {
        path: '/crimeOverview/crimeFile',
        name: '罪犯档案',
        component: './CrimeFile/index.tsx',
      },
      {
        path: '/crimeOverview/crimeEvaluation',
        name: '综合评估管理',
        component: './CrimeEvaluation/index.tsx',
      },
    ],
  },
  {
    path: '/comEvaluationResult',
    name: '评估结果管理',
    header: '罪犯综合评估系统',
    menuRender: false,
    component: './ComEvaluationResult/index.tsx',
  },
  {
    path: '/measureTable',
    name: '量表管理',
    header: '罪犯综合评估系统',
    menuRender: false,
    component: './EvaluationResult/index.tsx',
  },
  // 智能采集汇聚管理系统
  {
    path: '/converge',
    menuRender: false,
    name: '数据汇聚',
    header: '智能采集汇聚管理系统',
    component: './Converge/index.tsx',
  },
  {
    path: '/evaluationResultManage',
    menuRender: false,
    name: '评估结果管理',
    header: '智能采集汇聚管理系统',
    component: './EvaluationResult/index.tsx',
  },
  {
    path: '/measureTableManage',
    name: '量表管理',
    menuRender: false,
    header: '智能采集汇聚管理系统',
    component: './EvaluationResult/index.tsx',
  },
  {
    path: '/algorithmFactor',
    name: '算法因子库',
    header: '智能采集汇聚管理系统',
    routes: [
      {
        path: '/algorithmFactor',
        redirect: '/algorithmFactor/manage',
      },
      {
        path: '/algorithmFactor/manage',
        name: '算法管理',
        component: './AlgorithmFactor/AlgorithmManage/index.tsx'
      },
      {
        path: '/algorithmFactor/factor',
        name: '因子库',
        component: './AlgorithmFactor/FactorStore/index.tsx'
      },
    ]
  },
  {
    path: '/permission',
    name: '权限管理',
    menuRender: false,
    header: '智能采集汇聚管理系统',
    component: './Settings/Permission/index.tsx',
  },
  {
    path: '/authorize',
    menuRender: false,
    name: '登录跳转',
    header: false,
    hideInMenu: true,
    headerTitleRender: false,
    component: './AuthorizeRedirect',
  },
  {
    component: './404',
  },
];

// 外层的header属性，复制到内层
function handleRoutes(routes: Route[], parent?: Route) {
  routes.forEach((item) => {
    if (parent && item.name) {
      item.header = parent.header;
    }
    if (item.routes) {
      handleRoutes(item.routes, item);
    }
  });
}

handleRoutes(routes);

export default routes;
