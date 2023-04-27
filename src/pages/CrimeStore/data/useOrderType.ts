import { useState } from 'react';

// 列表分类
export enum OrderTypes {
  assessment_desc = 'assessment_desc',
  assessment_asc = 'assessment_asc',
  age_desc = 'age_desc',
  age_asc = 'age_asc',
  danger_desc = 'danger_desc',
  danger_asc = 'danger_asc',
}

// 当前状态分类
export default () => {
  const [curOrderType, setCurOrderType] = useState<OrderTypes>(OrderTypes.assessment_desc);
  const orderTypeList: { label: string; value: OrderTypes }[] = [
    { label: '按综合评估降序', value: OrderTypes.assessment_desc },
    { label: '按综合评估升序', value: OrderTypes.assessment_asc },
    { label: '按年龄降序', value: OrderTypes.age_desc },
    { label: '按年龄升序', value: OrderTypes.age_asc },
    { label: '按危险性降序', value: OrderTypes.danger_desc },
    { label: '按危险性升序', value: OrderTypes.danger_asc },
  ];
  return {
    curOrderType,
    orderTypeList,
    setCurOrderType,
  };
};
