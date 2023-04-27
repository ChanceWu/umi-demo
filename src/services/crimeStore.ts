import { request } from 'umi';
import type { PaginationResult } from './types';
import type { SearchParams } from './types/SearchParams';

// 【罪犯】罪犯库列表
export async function queryCrimyInfo(data: SearchParams = {}) {
  // return request<PaginationResult<CrimeStoreTypes.CrimyInfo>>(`/server/crimeStore/queryCrimyInfo`, {
  return request<PaginationResult<CrimeStoreTypes.CrimyInfo>>(`/ficus/v1/viewPortQuery/S1/yizhou/queryCrimyInfo`, {
    method: 'post',
    data,
  });
}

// 【罪犯】发起评估
export async function addAssessment(data: SearchParams = {}) {
  return request<PaginationResult<API.StatusResult>>(`/ficus/v1/viewPortQuery/S1/yizhou/addAssessment`, {
    method: 'post',
    data,
  });
}

// 【监区】查监舍
export async function queryPrisonArea(data: SearchParams = {}) {
  return request<PaginationResult<PrisonArea.Room>>(`/ficus/v1/viewPortQuery/S1/yizhou/queryPrisonArea`, {
    method: 'post',
    data,
  });
}

// 【监区】根据宿舍查人员
export async function queryPrisonAreaDetail(data: SearchParams = {}) {
  return request<PaginationResult<PrisonArea.Person>>(`/ficus/v1/viewPortQuery/S1/yizhou/queryPrisonAreaDetail`, {
    method: 'post',
    data,
  });
}

// 【监区】查基础信息
export async function queryPrisonAreaBase(data: SearchParams = {}) {
  return request<PaginationResult<PrisonArea.Base>>(`/ficus/v1/viewPortQuery/S1/yizhou/queryPrisonAreaBase`, {
    method: 'post',
    data,
  });
}

// 【罪犯档案】查页面所有信息
export async function queryOverview(data: SearchParams = {}) {
  return request<CrimeFileType.RootObject>(`/ficus/v1/viewPortQuery/S1/yizhou/queryOverview`, {
    method: 'post',
    data,
  });
}

// 【犯罪视图】 新增/取消 重点关注
export async function updateFollow(data: SearchParams = {}) {
  return request<CrimeFileType.RootObject>(`/ficus/v1/viewPortQuery/S1/yizhou/updateFollow`, {
    method: 'post',
    data,
  });
}
