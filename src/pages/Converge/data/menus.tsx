/* eslint-disable no-param-reassign */
import { DownloadOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import React from 'react';
import type { DataObj } from '..';

export enum PartType {
  cascader = 'cascader',
  select = 'select',
  input = 'input',
  button = 'button',
  datePicker = 'datePicker',
}

interface SearchPart {
  partType: PartType;
  key: string;
  width?: number;
  name?: string;
  dataKey?: string;
  dataRender?: (data: any) => any[];
  attrs?: Record<
    string,
    | string
    | boolean
    | number
    | ((data: { selectedRowDatas?: DataObj[] }) => string | boolean | number)
  >;
  formItemStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface MenuItemInter {
  title: string;
  key?: string;
  icon?: () => ReactNode;
  searchParts?: SearchPart[];
  children?: MenuItemInter[];
}

const searchPartsMap: Record<
  'prison' | 'label' | 'date' | 'searchInput' | 'reset' | 'search' | 'output',
  SearchPart
> = {
  prison: {
    partType: PartType.select,
    dataKey: 'source_prison',
    dataRender: (source_prison) => {
      if (source_prison instanceof Array && source_prison[0]) {
        const aList = source_prison[0].children || [];
        return aList;
      }
      return [];
    },
    name: 'prison_area',
    key: 'prison_area',
    attrs: {
      placeholder: '请选择监狱监区',
    },
  },
  label: {
    partType: PartType.select,
    dataKey: 'labelList',
    name: 'label',
    key: 'label',
    attrs: {
      placeholder: '请选择标签',
    },
  },
  date: {
    partType: PartType.datePicker,
    name: 'date',
    key: 'date',
    attrs: {
      picker: 'month',
    },
  },
  searchInput: {
    partType: PartType.input,
    name: 'search_value',
    key: 'search_value',
    attrs: {
      placeholder: '输入档卡号或姓名检索',
    },
  },
  reset: {
    partType: PartType.button,
    key: 'reset',
    children: (
      <>
        <UndoOutlined /> 重置
      </>
    ),
    attrs: {
      type: 'dashed',
    },
  },
  search: {
    partType: PartType.button,
    key: 'search',
    children: (
      <>
        <SearchOutlined /> 查询
      </>
    ),
    attrs: {
      type: 'primary',
      htmlType: 'submit',
    },
  },
  output: {
    partType: PartType.button,
    key: 'output',
    children: (
      <>
        <DownloadOutlined /> 批量导出
      </>
    ),
    formItemStyle: { marginLeft: 'auto', marginRight: 0 },
    attrs: {
      type: 'primary',
      disabled: ({ selectedRowDatas }) => (selectedRowDatas ? selectedRowDatas.length <= 0 : true),
    },
  },
};

const menus: MenuItemInter[] = [
  {
    title: '多维数据',
    key: '1',
    children: [
      {
        title: '人脸识别数据',
        key: '1-1',
        searchParts: [
          searchPartsMap.searchInput,
          searchPartsMap.search,
          searchPartsMap.reset,
          searchPartsMap.output,
        ],
      },
      {
        title: '亲情关系数据',
      },
      {
        title: '音频转文本数据',
        searchParts: [
          searchPartsMap.searchInput,
          searchPartsMap.search,
          searchPartsMap.reset,
          searchPartsMap.output,
        ],
      },
      {
        title: '短信分析',
      },
    ],
  },
  {
    title: '狱政管理',
    key: '11',
    children: [
      {
        title: '处遇等级',
        searchParts: [
          searchPartsMap.prison,
          {
            partType: PartType.select,
            dataKey: 'cydj_name',
            name: 'cydj_name',
            key: 'cydj_name',
            attrs: {
              placeholder: '请选择处遇等级',
            },
          },
          searchPartsMap.searchInput,
          searchPartsMap.search,
          searchPartsMap.reset,
          searchPartsMap.output,
        ],
      },
      {
        title: '互监组',
      },
      {
        title: '会见信息',
      },
      {
        title: '特殊岗位',
      },
      {
        title: '信件管理',
      },
      {
        title: '亲情电话',
      },
      {
        title: '特批会见',
        searchParts: [
          searchPartsMap.prison,
          {
            partType: PartType.select,
            dataKey: 'labelList',
            name: 'label',
            key: 'label',
            attrs: {
              placeholder: '请选择会见类型',
            },
          },
          searchPartsMap.searchInput,
          searchPartsMap.search,
          searchPartsMap.reset,
          searchPartsMap.output,
        ],
      },
      {
        title: '狱内奖罚',
        searchParts: [
          searchPartsMap.prison,
          {
            partType: PartType.select,
            dataKey: 'labelList',
            name: 'label',
            key: 'label',
            attrs: {
              placeholder: '类别',
            },
          },
          searchPartsMap.searchInput,
          searchPartsMap.search,
          searchPartsMap.reset,
          searchPartsMap.output,
        ],
      },
      {
        title: '惩戒训导',
      },
      {
        title: '计分考核',
      },
      {
        title: '外出管理',
      },
    ],
  },
  {
    title: '教育改造',
    children: [
      {
        title: '罪犯周评议',
      },
      {
        title: '三课成绩',
      },
      {
        title: '心理辅导干预',
      },
      {
        title: '亲情社会帮教',
      },
      {
        title: '参与兴趣活动',
      },
      {
        title: '入监教育考核',
        searchParts: [
          searchPartsMap.prison,
          searchPartsMap.date,
          searchPartsMap.searchInput,
          searchPartsMap.search,
          searchPartsMap.reset,
          searchPartsMap.output,
        ],
      },
      {
        title: '年终评审',
      },
    ],
  },
  {
    title: '劳动改造',
    children: [
      {
        title: '劳动岗位',
      },
      {
        title: '劳动技术等级',
      },
    ],
  },
  {
    title: '刑法执行',
    children: [
      {
        title: '检举控告申述',
      },
      {
        title: '财产性判项履行情况',
        searchParts: [
          searchPartsMap.prison,
          {
            partType: PartType.select,
            dataKey: 'labelList',
            name: 'label',
            key: 'label',
            attrs: {
              placeholder: '请选择类型',
            },
          },
          searchPartsMap.searchInput,
          searchPartsMap.search,
          searchPartsMap.reset,
          searchPartsMap.output,
        ],
      },
      {
        title: '减假保情况',
      },
    ],
  },
  {
    title: '狱侦信息',
    children: [
      {
        title: '核心事件',
      },
      {
        title: '罪犯异动',
      },
      {
        title: '涉嫌狱内再犯罪',
      },
    ],
  },
  {
    title: '生活卫生',
    children: [
      {
        title: '饮食情况',
      },
      {
        title: '上账购物',
      },
      {
        title: '疾病情况',
      },
      {
        title: '劳动酬薪',
      },
    ],
  },
];

export function getMemuItemData(
  keyPath: string[],
  menuList: MenuItemInter[],
  titlePath: string[] = [],
): (MenuItemInter & { titlePath: string[] }) | undefined {
  const key = keyPath.pop();
  const menu = menuList.find((item) => item.key === key);
  if (menu?.title) titlePath.push(menu.title);
  if (keyPath.length && menu?.children) return getMemuItemData(keyPath, menu.children, titlePath);
  return menu
    ? {
        ...menu,
        titlePath,
      }
    : undefined;
}

export function formatAttrs(
  attrs: SearchPart['attrs'],
  data: { selectedRowDatas?: DataObj[] } = {},
) {
  if (!attrs) return {};
  return Object.fromEntries(
    Object.entries(attrs).map((item) => {
      if (item[1] && typeof item[1] === 'function') {
        return [item[0], item[1](data)];
      }
      return item;
    }),
  );
}

// 递归menu配置，默认配置
function formatMenus(menusData: MenuItemInter[], parentKey: string = '') {
  menusData.forEach((item, index) => {
    if (!item.key) {
      item.key = `${parentKey}_${index}`;
    }
    if (!item.searchParts) {
      item.searchParts = [
        searchPartsMap.prison,
        searchPartsMap.searchInput,
        searchPartsMap.search,
        searchPartsMap.reset,
        searchPartsMap.output,
      ];
    }
    if (item.children) {
      formatMenus(item.children, item.key);
    }
  });
}

formatMenus(menus);

export default menus;
