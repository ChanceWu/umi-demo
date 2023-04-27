import StateBlock from '@/components/crime/StateBlock';
import { Progress } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const getColor = (percent: number) => {
  let color: string = '#40A3A1';
  if (percent >= 60) {
    color = '#DF2020';
  } else if (percent >= 45) {
    color = '#D88F22';
  }
  return color;
};

const Individual: React.FunctionComponent = () => {
  const { riskInfo } = useModel('crimeStore.evaluation');
  const suicidal_tendency = (riskInfo?.suicidal_tendency || 0) * 100;
  const violent_tendency = (riskInfo?.violent_tendency || 0) * 100;
  return (
    <div className={styles.wrap}>
      <StateBlock
        state={riskInfo?.danger_level || ''}
        value={riskInfo?.danger_value || ''}
        desc={'危险值'}
      />
      <div>
        <div className={styles.pWrap}>
          <div className={styles.pText} style={{ color: getColor(suicidal_tendency)}}>
            <span>自杀倾向</span>
            <span>{suicidal_tendency}%</span>
          </div>
          <Progress percent={suicidal_tendency} status="active" showInfo={false} strokeColor={getColor(suicidal_tendency)} />
        </div>
        <div className={styles.pWrap}>
          <div className={styles.pText} style={{ color: getColor(violent_tendency)}}>
            <span>暴力倾向</span>
            <span>{violent_tendency}%</span>
          </div>
          <Progress percent={violent_tendency} status="active" showInfo={false} strokeColor={getColor(violent_tendency)} />
        </div>
      </div>
    </div>
  );
};

export default Individual;
