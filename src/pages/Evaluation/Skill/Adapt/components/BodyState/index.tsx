import { formatValue } from '@/utils/utils';
import React from 'react';
import { useModel } from 'umi';
import InfoBlock from '../../../../components/InfoBlock';
import ExtraInfo from '../ExtraInfo';
import styles from './index.less';

const BodyState: React.FunctionComponent = () => {
  const { proBaseInfoExt } = useModel('evaluation.job');

  return (
    <InfoBlock
      title="身体状况"
      style={{ flex: 2, minWidth: 906 }}
      headerStyle={{ position: 'absolute', top: 16, right: 16, left: 16 }}
    >
      <div style={{ display: 'flex' }}>
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
              <span style={{ left: 130, top: 50 }}>{`智力：${formatValue(
                proBaseInfoExt.iq,
              )}`}</span>
              <span style={{ left: 83, top: 81 }}>{`视力：${formatValue(
                proBaseInfoExt.left_eye,
              )}`}</span>
              <span style={{ left: 391, top: 81 }}>{`色盲：${formatValue(
                proBaseInfoExt.color_blind,
              )}`}</span>
              <span style={{ left: 100, top: 166 }}>{`内脏器官：${formatValue(
                proBaseInfoExt.inter_organ,
              )}`}</span>
              <span style={{ left: 96, top: 301 }}>{`四肢躯干：${formatValue(
                proBaseInfoExt.limbs,
              )}`}</span>
            </div>
          </div>
          <div className={styles.extraInfo}>
            <span>
              <span>身高：</span>
              <span>{formatValue(proBaseInfoExt.height)}</span>
            </span>
            <span>
              <span>体重：</span> <span>{formatValue(proBaseInfoExt.weight)}</span>
            </span>
            <span>
              <span>体型：</span> <span>{formatValue(proBaseInfoExt.body_type)}</span>
            </span>
            <span>
              <span>残疾：</span> <span>{formatValue(proBaseInfoExt.disability)}</span>
            </span>
            <span>
              <span>疾病史：</span> <span>{formatValue(proBaseInfoExt.medical_his)}</span>
            </span>
          </div>
        </div>
        <ExtraInfo style={{ flex: 1 }} />
      </div>
    </InfoBlock>
  );
};

export default BodyState;
