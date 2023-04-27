import { Request, Response } from 'express';

// 基础信息
const getAssessInfo = (req: Request, res: Response) => {
  const resultList: EvaluationTypes.AssessInfo[] = [
    {
      birthday: '1968-4-5',
      crime_age: '30',
      crime_lg: '累惯犯',
      crime_name: '抢劫',
      id: '05454656',
      id_num: '515454565656599',
      name: '张三',
      sex: '男',
      xq: '30年',
      xq_remain: 'string',
      photo_file: '',
    },
  ];
  res.json({ resultList });
};

// 获取评估时间等信息
const getRecrime = (req: Request, res: Response) => {
  const resultList: EvaluationTypes.Recrime[] = [
    {
      id: '123138',
      evaluate_date: '2021-01-21 10:10:01',
      probab: '10',
      re_crime: 1,
    },
  ];
  res.json({ resultList });
};

// 正负因素排名
const getFeatureInfo = (req: Request, res: Response) => {
  const resultList: EvaluationTypes.EvaFactor[] = Array(60)
    .fill(1)
    .map((d, i) => ({
      num: i + 1,
      feature: '因素名' + i,
      assess_date: '2015',
      values: '因素值',
      shap_value: i % 2 === 0 ? 10 + i : -(10 + i),
      id: '',
      primaryId: 0,
      type: 0,
    }));
  res.json({ resultList });
};

// 职业评估基础附加信息
const getBaseAssess = (req: Request, res: Response) => {
  const resultList: EvaluationTypes.BaseAssess[] = [
    {
      id: '112551626',
      height: 160,
      weight: 100,
      education: '小学',
      family_situation: '离异',
      profession_bq: '个体',
      special_skill: '旋转跳跃',
      labor_level: '一般',
      character_feature: '起飞',
      professionalism: '起飞',
      labor_values: '起飞',
    },
  ];
  res.json({ resultList });
};

// 职业评估-适应性-评估时间推荐工种
const getProAssess = (req: Request, res: Response) => {
  const resultList: EvaluationTypes.ProAssess[] = [
    {
      assess_date: '2020.11.10',
    },
  ];
  res.json({ resultList });
};
// 职业评估-适应性-工种排名
const getCategoryRank = (req: Request, res: Response) => {
  const resultList: EvaluationTypes.JobCategory[] = Array(50)
    .fill(1)
    .map((d, i) => ({
      category: `服装加工-${i}级工种`,
      probab: i * 2,
    }));
  res.json({ resultList });
};

export default {
  'POST /comprehensive-assessment-system/ficus/v1/viewPortQuery/S1/yizhou/queryEvaFactor':
    getFeatureInfo,
  'POST /comprehensive-assessment-system/ficus/v1/viewPortQuery/S1/yizhou/queryAssessInfo':
    getAssessInfo,
  'POST /comprehensive-assessment-system/ficus/v1/viewPortQuery/S1/yizhou/queryRecrime': getRecrime,
  'POST /comprehensive-assessment-system/ficus/v1/viewPortQuery/S1/yizhou/queryBaseAssess':
    getBaseAssess,
  'POST /comprehensive-assessment-system/ficus/v1/viewPortQuery/S1/yizhou/queryProAssess':
    getProAssess,
  'POST /comprehensive-assessment-system/ficus/v1/viewPortQuery/S1/yizhou/queryCategoryRank':
    getCategoryRank,
};
