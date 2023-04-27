import { formatValue } from '@/utils/utils';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const BodyState: React.FunctionComponent = () => {
  const { baseInfo } = useModel('crimeStore.evaluation');

  return (
    <div className={styles.wrap}>
      <div className={styles.container} style={{ flex: 2 }}>
        <div className={styles.humanWrap}>
          <img
            className={styles.humanBody}
            src={require('@/assets/images/evaluation/humanBody.png')}
          />
          <img
            className={styles.humanBase}
            src={require('@/assets/images/evaluation/bodyBase.gif')}
          />
          <div className={styles.humanInfo}>
            <span>{`智力：${formatValue(baseInfo?.iq)}`}</span>
            <span>{`视力：${formatValue(baseInfo?.left_eye)}`}</span>
            <span>{`色盲：${formatValue(baseInfo?.color_blind)}`}</span>
            <span>{`内脏器官：${formatValue(baseInfo?.inter_organ)}`}</span>
            <span>{`四肢躯干：${formatValue(baseInfo?.limbs)}`}</span>
          </div>
        </div>
        <div className={styles.extraInfo}>
          <div>
            <span>身高：</span>
            <span>{formatValue(baseInfo?.height)}</span>
          </div>
          <div>
            <span>体重：</span> <span>{formatValue(baseInfo?.weight)}</span>
          </div>
          <div>
            <span>体型：</span> <span>{formatValue(baseInfo?.body_type)}</span>
          </div>
          <div>
            <span>残疾：</span> <span>{formatValue(baseInfo?.disability)}</span>
          </div>
          <div>
            <span>疾病史：</span> <span>{formatValue(baseInfo?.medical_his)}</span>
          </div>
        </div>
        <div className={styles.bottomBorder}>
          <img src={require('@/assets/images/evaluation/left_bottom_border.png')} />
          <span>身体状态：{formatValue(baseInfo?.body_quality)}</span>
        </div>
      </div>
    </div>
  );
};

export default BodyState;
