import { formatParams } from '@/utils/utils';
import { request } from 'umi';
import type { PaginationResult } from './types';
import type { SearchParams } from './types/SearchParams';

// 评估罪犯基础信息
export async function queryAssessInfo(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.AssessInfo>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessInfo`,
    {
      method: 'post',
      data,
    },
  );
}

// 再犯罪预测评估-附加信息
export async function queryRecrime(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.Recrime>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryRecrime`,
    {
      method: 'post',
      data,
    },
  );
}

// 再犯罪预测评估-评估因素
export async function queryEvaFactor(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.EvaFactor>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryEvaFactor`,
    {
      method: 'post',
      data,
    },
  );
}

// 职业技术能力评估-岗位适应性评估-评估时间推荐工种等信息
export async function queryProAssess(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.ProAssess>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryProAssess`,
    {
      method: 'post',
      data,
    },
  );
}

// 职业技术能力评估-基础附加信息
export async function queryProBaseInfoExt(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.ProBaseInfoExt>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryProBaseInfoExt`,
    {
      method: 'post',
      data,
    },
  );
}

// 职业技术能力评估-基础附加信息
export async function queryChange(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.JobChange>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryChange`,
    {
      method: 'post',
      data,
    },
  );
}

// 职业技术能力评估-劳动完成情况
export async function queryLaborFinish(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.LaborFinish>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryLaborFinish`,
    {
      method: 'post',
      data,
    },
  );
}

// 职业技术能力评估-推荐工种
export async function queryProRecommend(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.ProRecommend>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryProRecommend`,
    {
      method: 'post',
      data,
    },
  );
}

// 【评估结果】
export async function queryAssessResult(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.EvaluationResult>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessResult`,
    {
      method: 'post',
      data,
    },
  );
}

// 【综合】【评估结果】
export async function queryAssessResultCom(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.EvaluationResult>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessResultCom`,
    {
      method: 'post',
      data,
    },
  );
}

// 【综合】【评估结果】【历史详情】
export async function queryAssessResultComHis(data: SearchParams = {}) {
  return request<PaginationResult<EvaluationTypes.EvaluationResultHistory>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessResultComHis`,
    {
      method: 'post',
      data,
    },
  );
}

// 【综合页面数据】
export async function queryAssessBaseInfo(data: SearchParams = {}) {
  return request<PaginationResult<CrimeEvaluationType.BaseInfo>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessBaseInfo`,
    {
      method: 'post',
      data,
    },
  );
}

// 职业能力评估
export async function queryAssessVocationalTechnolog(data: SearchParams = {}) {
  return request<PaginationResult<CrimeEvaluationType.Technolog>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessVocationalTechnolog`,
    {
      method: 'post',
      data,
    },
  );
}

// 个体危险性评估
export async function queryAssessIndividualRiskInfo(data: SearchParams = {}) {
  return request<PaginationResult<CrimeEvaluationType.RiskInfo>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessIndividualRiskInfo`,
    {
      method: 'post',
      data,
    },
  );
}

// 社会适应性评估
export async function queryAssessSociologyAdaptInfo(data: SearchParams = {}) {
  return request<PaginationResult<CrimeEvaluationType.AdaptInfo>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessSociologyAdaptInfo`,
    {
      method: 'post',
      data,
    },
  );
}

// 【评估详情页】个体危险性 打卡信息
export async function queryAssessClockInfo(
  data: {
    id?: string;
    pageSize_?: number;
    pageNum_?: number;
  } = {},
) {
  return request<PaginationResult<CrimeEvaluationType.Clock>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessClockInfo`,
    {
      method: 'post',
      data: formatParams(data),
    },
  );
}

// 【评估详情页】个体危险性 异常事件
export async function queryAssessAbnormalInfo(
  data: {
    id?: string;
    start_date?: string;
    end_date?: string;
    conscious_state?: string;
    expression_discern?: string;
    activity_area?: string;
    pageSize_?: number;
    pageNum_?: number;
  } = {},
) {
  return request<PaginationResult<CrimeEvaluationType.Abnormal>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessAbnormalInfo`,
    {
      method: 'post',
      data: formatParams(data),
    },
  );
}

// 【评估详情页】时间线
export async function queryAssessTimeAxis(data: SearchParams = {}) {
  return request<PaginationResult<CrimeEvaluationType.TimeAxis[]>>(
    `/ficus/v1/viewPortQuery/S1/yizhou/queryAssessTimeAxis`,
    {
      method: 'post',
      data,
    },
  );
}
