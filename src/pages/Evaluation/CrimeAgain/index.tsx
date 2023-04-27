import StateCircleItem from '@/components/common/StateCircleItem';
import useMount from '@/hooks/useMount';
import { EvaluationApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import { useLocation, useModel } from 'umi';
import BaseInfo from '../components/BaseInfo';
import TitleBar from '../components/TitleBar';
import Compare from './components/Compare';
import Discipline from './components/Discipline';
import Factor from './components/Factor';
import MoreEvaluation from './components/MoreEvaluation';
import Trend from './components/Trend';
import styles from './index.less';

const CrimeAgain: React.FunctionComponent = () => {
  const [moreVisible, setMoreVisible] = useState<boolean>(false);
  const { setBaseInfo } = useModel('evaluation.common');
  const { recrime, setRecrime, setFeatureInfo } = useModel('evaluation.crimeAgain');
  const location = useLocation();

  // 获取基础信息
  const getAssessInfo = useCallback(() => {
    EvaluationApi.queryAssessInfo(
      formatParams({
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: location['query'].id,
      }),
    ).then((data) => {
      if (data.resultList && data.resultList.length) {
        setBaseInfo(data.resultList[0]);
      }
    });
  }, [location, setBaseInfo]);

  const getRecrime = useCallback(() => {
    EvaluationApi.queryRecrime(
      formatParams({
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: location['query'].id,
      }),
    ).then((data) => {
      if (data.resultList instanceof Array) {
        setRecrime(data.resultList[0]);
      }
    });
  }, [location, setRecrime]);

  const getFeatureInfo = useCallback(() => {
    EvaluationApi.queryEvaFactor(
      formatParams({
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: location['query'].id,
      }),
    ).then((data) => {
      if (data.resultList instanceof Array) {
        setFeatureInfo(data.resultList);
      }
    });
  }, [location, setFeatureInfo]);

  useMount(() => {
    getAssessInfo();
    getRecrime();
    getFeatureInfo();
  });

  return (
    <div className={styles.wrap}>
      <TitleBar date={recrime.evaluate_date} title="再犯罪评估报告" />
      {/* 详情信息 */}
      <BaseInfo
        rightContent={() => (
          <>
            <StateCircleItem
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                marginRight: 50,
                cursor: 'default',
              }}
              text={recrime.re_crime === 1 ? '有风险' : '无风险'}
              desc="评估结果"
              color={recrime.re_crime === 1 ? 'rgb(239, 55, 98)' : 'rgb(35, 206, 253)'}
              isActive
              size={70}
            />
            <div
              className={styles.stateDesc}
              style={{ color: recrime.re_crime === 1 ? 'rgb(239, 55, 98)' : 'rgb(35, 206, 253)' }}
            >
              风险值：{recrime.probab}
            </div>
          </>
        )}
      />
      <div style={{ padding: '0 20px' }}>
        {/* 评估因素 */}
        <Factor />
        <div className={styles.row}>
          <Trend />
          <Compare />
        </div>
        <Discipline />
        {/* <Compared /> */}
        <div className={styles.bottom}>
          <Button className={styles.bottomBtn} type="primary">
            <a
              href="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              download="1.png"
            >
              <DownloadOutlined /> 下载文档
            </a>
          </Button>
        </div>
      </div>

      <MoreEvaluation
        visible={moreVisible}
        onCancel={() => setMoreVisible(false)}
        onOk={() => setMoreVisible(false)}
      />
    </div>
  );
};

export default CrimeAgain;
