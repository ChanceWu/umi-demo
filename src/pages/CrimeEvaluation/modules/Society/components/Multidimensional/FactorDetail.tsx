import React from 'react';
import styles from './index.less';

const FactorDetail: React.FunctionComponent = () => {
  return (
    <div className={styles.factorDetail}>
      <span>就业能力：劳动技能、就业态度、就业资源、职业技能评估</span>
      <span>社会支持：社会关系、家庭经济、住所</span>
      <span>身心状况：身体素质、个性特征、心理素质、身心健康评估</span>
      <span>行为规范：生活习惯、自我管理能力、遵守规范</span>
      <span>服刑态度：犯罪史、法院判决态度、主动申诉、认罪悔罪评估、再犯罪评估</span>
    </div>
  )
}

export default FactorDetail;
