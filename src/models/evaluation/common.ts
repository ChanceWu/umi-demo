import { useState } from 'react';

// 再犯罪评估报告
export default () => {
  // 基础信息
  const [baseInfo, setBaseInfo] = useState<Partial<EvaluationTypes.AssessInfo>>({});

  return {
    baseInfo,
    setBaseInfo,
  };
};
