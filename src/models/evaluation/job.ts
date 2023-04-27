import { useState } from 'react';

// 职业技术评估
export default () => {
  // 评估时间信息
  const [proAssess, setProAssess] = useState<Partial<EvaluationTypes.ProAssess>>({});
  const [proBaseInfoExt, setProBaseInfoExt] = useState<Partial<EvaluationTypes.ProBaseInfoExt>>({});
  const [jobChange, setJobChange] = useState<EvaluationTypes.JobChange[]>([]);
  const [laborFinish, setLaborFinish] = useState<EvaluationTypes.LaborFinish[]>([]);
  const [proRecommend, setProRecommend] = useState<Partial<EvaluationTypes.ProRecommend>>({});

  return {
    proAssess,
    setProAssess,
    proBaseInfoExt,
    setProBaseInfoExt,
    jobChange,
    setJobChange,
    laborFinish,
    setLaborFinish,
    proRecommend,
    setProRecommend,
  };
};
