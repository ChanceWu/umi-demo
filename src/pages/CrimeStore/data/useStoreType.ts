import { useState } from 'react';

// 列表分类
export enum StoreTypes {
  All = 'all', // 全部
  New = 'new', // 新入监
  Follow = 'follow', // 重点关注
  Main = 'main', // 主管对象
}

// 当前状态分类
export default () => {
  const [curStoreType, setCurStoreType] = useState<StoreTypes>(StoreTypes.All);
  const storeTypeList: { label: string; value: StoreTypes }[] = [
    { label: '全部', value: StoreTypes.All },
    { label: '重点关注', value: StoreTypes.Follow },
    // { label: '主管对象', value: StoreTypes.Main },
  ];
  return {
    storeTypeList,
    curStoreType,
    setCurStoreType,
  };
};
