import { request } from 'umi';
import type { PaginationResult } from './types';
import type { SearchParams } from './types/SearchParams';

// 【算法】算法列表
export async function queryAlgorithmInfo(data: SearchParams = {}) {
  return request<PaginationResult<AlgorithmFactorType.AlgorithmInfo>>(`/ficus/v1/viewPortQuery/S1/yizhou/queryAlgorithmInfo`, {
    method: 'post',
    data,
  });
}

// 【算法】算法列表 编辑算法信息
export async function updateAlgorithmInfo(data: SearchParams = {}) {
  return request<PaginationResult<AlgorithmFactorType.AlgorithmInfo>>(`/ficus/v1/viewPortQuery/S1/yizhou/updateAlgorithmInfo`, {
    method: 'post',
    data,
  })
}

// 【算法】因子列表
export async function queryAlgorithmInfoField(data: SearchParams = {}) {
  return request<PaginationResult<AlgorithmFactorType.AlgorithmInfoField>>(`/ficus/v1/viewPortQuery/S1/yizhou/queryAlgorithmInfoField`, {
    method: 'post',
    data,
  });
}

// 【算法】因子列表 更新item
export async function updateAlgorithmInfoField(data: SearchParams = {}) {
  return request<PaginationResult<AlgorithmFactorType.AlgorithmInfoField>>(`/ficus/v1/viewPortQuery/S1/yizhou/updateAlgorithmInfoField`, {
    method: 'post',
    data,
  });
}

// 【算法】因子列表 删除item
export async function deleteAlgorithmInfoField(data: SearchParams = {}) {
  return request<PaginationResult<AlgorithmFactorType.AlgorithmInfoField>>(`/ficus/v1/viewPortQuery/S1/yizhou/deleteAlgorithmInfoField`, {
    method: 'post',
    data,
  });
}

// 因子列表 获取 溯源表/溯源字段 options
export async function queryTableList(data: SearchParams = {}) {
  return request<PaginationResult<AlgorithmFactorType.TableList>>(`/ficus/v1/viewPortQuery/S1/yizhou/queryTableList`, {
    method: 'post',
    data,
  });
}
