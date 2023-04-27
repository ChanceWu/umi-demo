import { useState } from 'react';

// 评估数据
export default () => {
  const [baseInfo, setBaseInfo] = useState<CrimeEvaluationType.BaseInfo>();
  const [technolog, setTechnolog] = useState<CrimeEvaluationType.Technolog>();
  const [riskInfo, setRiskInfo] = useState<CrimeEvaluationType.RiskInfo>();
  const [adaptInfo, setAdaptInfo] = useState<CrimeEvaluationType.AdaptInfo>();
  const [timeAxis, setTimeAxis] = useState<CrimeEvaluationType.TimeAxis[]>();

  return {
    baseInfo,
    setBaseInfo,
    technolog,
    setTechnolog,
    riskInfo,
    setRiskInfo,
    adaptInfo,
    setAdaptInfo,
    timeAxis,
    setTimeAxis,
  };
};
