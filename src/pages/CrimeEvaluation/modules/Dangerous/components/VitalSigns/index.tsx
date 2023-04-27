import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import Line from './Line';
import Record from './Record';

const VitalSigns: React.FunctionComponent = () => {
  const { riskInfo } = useModel('crimeStore.evaluation');
  const temperatures = (riskInfo?.vital_sign || []).map((item) => ({
    title: item.create_date,
    value: item.temperature,
  }));
  const pulses = (riskInfo?.vital_sign || []).map((item) => ({
    title: item.create_date,
    value: item.pulse,
  }));
  const heart_rates = (riskInfo?.vital_sign || []).map((item) => ({
    title: item.create_date,
    value: item.heart_rate,
  }));
  return (
    <div className={styles.gridWrap}>
      <Record data={riskInfo?.vital_sign[riskInfo?.vital_sign.length - 1]} />
      <Line title="体温变化（近一个月）" data={temperatures} color="#5B8FF9" />
      <Line title="脉搏变化（近一个月）" data={pulses} color="#40A3A1" />
      <Line title="心率变化（近一个月）" data={heart_rates} color="#D88F22" />
    </div>
  );
};

export default VitalSigns;
