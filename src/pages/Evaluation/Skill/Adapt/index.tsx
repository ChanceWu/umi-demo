import useMount from '@/hooks/useMount';
import { EvaluationApi } from '@/services';
import { formatParams, formatValue } from '@/utils/utils';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useModel } from 'umi';
import BaseInfo from '../../components/BaseInfo';
import TitleBar from '../../components/TitleBar';
import AttachBlock from './components/AttachBlock';
import BodyState from './components/BodyState';
import LaborCompletion from './components/LaborCompletion';
import LevelChange from './components/LevelChange';
import styles from './index.less';

const Adapt: React.FunctionComponent = () => {
  const { setBaseInfo } = useModel('evaluation.common');
  const {
    setProAssess,
    proAssess,
    setProBaseInfoExt,
    proBaseInfoExt,
    setJobChange,
    setLaborFinish,
    setProRecommend,
    proRecommend,
  } = useModel('evaluation.job');
  const location = useLocation();
  const [showAttach, setShowAttach] = useState<boolean>(false);

  // 展示时的要求，在控制台
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    window['show'] = setShowAttach;
    return () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      delete window['show'];
    };
  }, []);

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

  // 评估时间等信息
  const getProAssess = useCallback(() => {
    EvaluationApi.queryProAssess(
      formatParams({
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: location['query'].id,
      }),
    ).then((data) => {
      if (data.resultList instanceof Array && data.resultList.length) {
        setProAssess(data.resultList[0]);
      }
    });
  }, [location, setProAssess]);

  // 附加信息
  const getProBaseInfoExt = useCallback(() => {
    EvaluationApi.queryProBaseInfoExt(
      formatParams({
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: location['query'].id,
      }),
    ).then((data) => {
      if (data.resultList instanceof Array && data.resultList.length) {
        setProBaseInfoExt(data.resultList[0]);
      }
    });
  }, [location, setProBaseInfoExt]);

  // 工种级别变更
  const getJobChange = useCallback(() => {
    EvaluationApi.queryChange(
      formatParams({
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: location['query'].id,
      }),
    ).then((data) => {
      if (data.resultList instanceof Array && data.resultList.length) {
        setJobChange(data.resultList);
      }
    });
  }, [location, setJobChange]);

  // 劳动完成情况
  const getLaborFinish = useCallback(() => {
    EvaluationApi.queryLaborFinish(
      formatParams({
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: location['query'].id,
      }),
    ).then((data) => {
      if (data.resultList instanceof Array && data.resultList.length) {
        setLaborFinish(data.resultList);
      }
    });
  }, [location, setLaborFinish]);

  // 推荐工种
  const getProRecommend = useCallback(() => {
    EvaluationApi.queryProRecommend(
      formatParams({
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: location['query'].id,
      }),
    ).then((data) => {
      if (data.resultList instanceof Array && data.resultList.length) {
        setProRecommend(data.resultList[0]);
      }
    });
  }, [location, setProRecommend]);

  useMount(() => {
    getAssessInfo();
    getProAssess();
    getProBaseInfoExt();
    getJobChange();
    getLaborFinish();
    getProRecommend();
  });

  return (
    <div className={styles.wrap}>
      <TitleBar date={proAssess.assess_date} title="职业技术能力评估" />
      <BaseInfo
        extraInfo={(baseInfo) => (
          <>
            <span>
              剩余刑期：<span>{formatValue(baseInfo?.xq_remain)}</span>
            </span>
            <span>
              前科情况：<span>第{formatValue(proBaseInfoExt.crime_record_count)}次入狱</span>
            </span>
            <span>
              学历：<span>{formatValue(proBaseInfoExt.cultural_level)}</span>
            </span>
            <span>
              家庭情况：<span>{formatValue(proBaseInfoExt.marriage_now)}</span>
            </span>
            <span>
              危险等级：
              <span style={{ padding: '2px 15px', background: '#5570C6', color: '#fff' }}>
                {formatValue(proBaseInfoExt.danger_level)}
              </span>
            </span>
            <span>
              捕前职业：<span>{formatValue(proBaseInfoExt.profession_bq)}</span>
            </span>
            <span>
              技能特长：<span>{formatValue(proBaseInfoExt.special_skill)}</span>
            </span>
            <span>
              历史狱内改造情况：<span>{formatValue(proBaseInfoExt.change_his)}</span>
            </span>
          </>
        )}
        rightContent={() => (
          <div className={styles.rightContent}>
            <div className={styles.header}>
              <span>劳动工种及级别</span>
            </div>
            <div className={styles.rowText}>
              <div className={styles.textWrap}>
                <span>推荐</span>
                <span>{formatValue(proRecommend.recommend_work)}</span>
              </div>
              <div className={styles.textWrap}>
                <span>当前</span>
                <span>{formatValue(proRecommend.current_work)}</span>
              </div>
              <div className={styles.textWrap} style={{ gridColumnStart: 1, gridColumnEnd: 3 }}>
                <span>其他适合</span>
                <span>{formatValue(proRecommend.other_work)}</span>
              </div>
            </div>
          </div>
        )}
      />
      <div style={{ padding: '0 20px' }}>
        <BodyState />
        {showAttach && <AttachBlock />}
        <div className={styles.row} style={{ marginBottom: 10 }}>
          <LevelChange />
          <LaborCompletion />
        </div>
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
    </div>
  );
};

export default Adapt;
