import type { SearchPartsEnumType } from '@/hooks/useEnumData';
import { request } from 'umi';
import type { PaginationResult } from './types';
import type { SearchParams } from './types/SearchParams';

// 数据汇聚 查数据
export async function queryDataConfluence(data: SearchParams = {}) {
  return request<PaginationResult<Record<string, any>>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryDataConfluence`,
    {
      method: 'post',
      data,
    },
  );
}

// 数据汇聚 查遍历值
export async function queryEnumList(data: SearchParams = {}) {
  return request<PaginationResult<SearchPartsEnumType>>(`/ficus/v1/viewPortQuery/S1/yizhou/queryItem`, {
    method: 'post',
    data,
  });
}
