import InfoBreadcrumb from '@/components/crime/InfoBreadcrumb';
import { queryOverview } from '@/services/crimeStore';
import { formatParams } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import type * as H from 'history';
import React, { useState } from 'react';
import { useHistory, useLocation, useModel } from 'umi';
import BottomDownload from '@/components/crime/BottomDownload';
import InfoList from '../../components/crime/InfoList';
import InfoTabs from '@/components/crime/InfoTabs';
import styles from './index.less';
import BaseInfoModule from './modules/BaseInfo';
import BaseInfoExtra from './modules/BaseInfoExtra';
import CrimeRecords from './modules/CrimeRecords';
import Disease from './modules/Disease';
import Education from './modules/Education';
import Family from './modules/Family';
import SocialContact from './modules/SocialContact';
import CrimeVideo from './modules/CrimeVideo';

const CrimeFile: React.FunctionComponent = () => {
  const crimeInfo = useModel('crimeStore.crimeFile');
  const [activeModule, setActiveModule] = useState<string>('info');
  const history = useHistory();
  const location: H.Location & { query?: { id: string } } = useLocation();
  const { loading } = useRequest(
    () =>
      queryOverview(
        formatParams({
          id: location.query?.id,
        }),
      ),
    {
      onSuccess: (res) => {
        if (res.resultList && res.resultList[0]) {
          crimeInfo.setBaseInfo(res.resultList[0].baseinfo);
          crimeInfo.setDajlInfo(res.resultList[0].dajlInfo);
          crimeInfo.setDiseaseInfo(res.resultList[0].diseaseInfo);
          crimeInfo.setFamilyInfo(res.resultList[0].familyInfo);
          crimeInfo.setRecordInfo(res.resultList[0].recordInfo);
          crimeInfo.setVideoInfo(res.resultList[0].videoInfo);
        }
      },
    },
  );

  return (
    <div className={styles.wrap}>
      <Spin spinning={loading}>
        <InfoBreadcrumb list={[{ title: '监区视图' }, { title: '罪犯档案' }]} />
        <InfoTabs
          tabs={[
            { title: '罪犯档案', key: '1' },
            { title: '综合评估结果', key: '2' },
          ]}
          activeKey="1"
          onChange={(activeKey) => {
            if (activeKey === '2') {
              history.push(`/crimeOverview/crimeEvaluation${location.search}`);
            }
          }}
        />
        <BaseInfoModule />
        <InfoTabs
          tabs={[
            { title: '360基本信息', key: 'info' },
            { title: '视频信息', key: 'video' },
          ]}
          onChange={(key) => setActiveModule(key)}
        />
        {activeModule === 'info' ? (
          <InfoList>
            <BaseInfoExtra />
            <CrimeRecords />
            <Education />
            <Family />
            <Disease />
            <SocialContact />
            <BottomDownload />
          </InfoList>
        ) : (
          <InfoList>
            <CrimeVideo />
            <BottomDownload />
          </InfoList>
        )}
      </Spin>
    </div>
  );
};

export default CrimeFile;
