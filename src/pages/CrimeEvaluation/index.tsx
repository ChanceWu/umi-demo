import BottomDownload from '@/components/crime/BottomDownload';
import InfoBreadcrumb from '@/components/crime/InfoBreadcrumb';
import InfoList from '@/components/crime/InfoList';
import type { TimeLineProps } from '@/components/crime/TimeLine';
import TimeLine from '@/components/crime/TimeLine';
import useQueryState from '@/hooks/useQueryState';
import { EvaluationApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useHistory, useLocation, useModel } from 'umi';
import InfoTabs from '../../components/crime/InfoTabs';
import BaseInfoModule from './components/BaseInfo';
import styles from './index.less';
import BaseEvaluation from './modules/BaseEvaluation';
import Dangerous from './modules/Dangerous';
import Profession from './modules/Profession';
import Society from './modules/Society';

export interface CrimeEvaluationProps {
  id: string;
  assess_date?: string;
}

const CrimeEvaluation: React.FunctionComponent<CrimeEvaluationProps> = (props) => {
  const history = useHistory();
  const location = useLocation();
  const evaluationInfo = useModel('crimeStore.evaluation');
  const [urlQuery, setQuery] = useQueryState();
  const query = useMemo(() => {
    return {
      id: props.id || urlQuery.id,
      assess_date: props.assess_date || urlQuery.assess_date,
    };
  }, [props.assess_date, props.id, urlQuery.assess_date, urlQuery.id]);
  const params = useMemo(() => {
    return formatParams({
      id: query.id,
      assess_date: query.assess_date,
    });
  }, [query]);
  const { run, loading } = useRequest(
    () =>
      Promise.all([
        // 基础数据
        EvaluationApi.queryAssessBaseInfo(params),
        // 职业能力评估
        EvaluationApi.queryAssessVocationalTechnolog(params),
        // 个体危险性评估
        EvaluationApi.queryAssessIndividualRiskInfo(params),
        // 社会适应性评估
        EvaluationApi.queryAssessSociologyAdaptInfo(params),
        // 时间线
        EvaluationApi.queryAssessTimeAxis(params),
      ]),
    {
      manual: true,
      onSuccess: (res) => {
        if (res[0] && res[0].resultList && res[0].resultList[0]) {
          evaluationInfo.setBaseInfo(res[0].resultList[0]);
        }
        if (res[1] && res[1].resultList && res[1].resultList[0]) {
          evaluationInfo.setTechnolog(res[1].resultList[0]);
        }
        if (res[2] && res[2].resultList && res[2].resultList[0]) {
          evaluationInfo.setRiskInfo(res[2].resultList[0]);
        }
        if (res[3] && res[3].resultList && res[3].resultList[0]) {
          evaluationInfo.setAdaptInfo(res[3].resultList[0]);
        }
        if (res[4] && res[4].resultList && res[4].resultList[0]) {
          evaluationInfo.setTimeAxis(res[4].resultList[0]);
        }
      },
    },
  );

  useEffect(() => {
    if (query.id) {
      run();
    }
  }, [query, run]);

  const timeLineProps: TimeLineProps = useMemo(() => {
    if (evaluationInfo.timeAxis && evaluationInfo.baseInfo?.assess_date) {
      return {
        initYearMonth: query.assess_date || evaluationInfo.baseInfo?.assess_date,
        initSelectedDay: query.assess_date || evaluationInfo.baseInfo?.assess_date,
        hasDays: evaluationInfo.timeAxis.map((item) => item.assess_date),
      };
    }
    return {};
  }, [evaluationInfo.timeAxis, evaluationInfo.baseInfo?.assess_date, query.assess_date]);

  const handleDateChange = (d: string) => {
    setQuery({
      ...query,
      assess_date: d,
    });
  };

  return (
    <div className={styles.wrap}>
      <Spin spinning={loading}>
        {!props.id && (
          <>
            <InfoBreadcrumb list={[{ title: '监区视图' }, { title: '综合评估结果' }]} />
            <InfoTabs
              tabs={[
                { title: '罪犯档案', key: '1' },
                { title: '综合评估结果', key: '2' },
              ]}
              activeKey="2"
              onChange={(activeKey) => {
                if (activeKey === '1') {
                  history.push(`/crimeOverview/crimeFile${location.search}`);
                }
              }}
            />
          </>
        )}
        <BaseInfoModule />
        {!props.id && <TimeLine {...timeLineProps} onChange={handleDateChange} />}
        <InfoList menuStickyTop={props.id ? 30 : 80}>
          <BaseEvaluation />
          <Profession />
          <Dangerous />
          <Society />
          <BottomDownload />
        </InfoList>
      </Spin>
    </div>
  );
};

export default CrimeEvaluation;
