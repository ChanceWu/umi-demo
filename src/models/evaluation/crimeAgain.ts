import { useState } from 'react';

// 再犯罪评估报告
export default () => {
  // 附加信息
  const [recrime, setRecrime] = useState<Partial<EvaluationTypes.Recrime>>({});
  // 评估因素
  const [featureInfo, setFeatureInfo] = useState<EvaluationTypes.EvaFactor[]>([]);

  return {
    recrime,
    setRecrime,
    featureInfo,
    setFeatureInfo,
  };
};
