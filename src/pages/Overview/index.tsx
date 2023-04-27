import React from 'react';
import DangerModel from './components/DangerModel';
import FiveReModel from './components/FiveReModel';
import HealthModel from './components/HealthModel';
import Map from './components/MapModel';
import PleadGuiltyModel from './components/PleadGuiltyModel';
import RecommendModel from './components/RecommendModel';
import ReCrimeModel from './components/ReCrimeModel';
import ReEscortStruct from './components/ReEscortStruct';
import RetrofitModel from './components/RetrofitModel';
import SituationModel from './components/SituationModel';
import SocietyModel from './components/SocietyModel';
import StructureModel from './components/StructureModel';
import TechnologyModel from './components/TechnologyModel';
import styles from './index.less';

const Overview: React.FunctionComponent = () => {
  return (
    <div className={styles.overview}>
      <div className={styles.overviewColNormal}>
        <div className={styles.overviewItem} style={{ height: '22vw' }}>
          {/* 社会适应性评估统计 */}
          <SocietyModel />
        </div>
        <div className={styles.overviewItem} style={{ height: '22vw' }}>
          {/* 再犯罪预测评估统计 */}
          <ReCrimeModel />
        </div>
        <div className={styles.overviewItem} style={{ height: '22vw' }}>
          {/* 个体危险性评估 */}
          <DangerModel />
        </div>
        <div className={styles.overviewItem} style={{ height: '22vw' }}>
          {/* 改造难易度评估 */}
          <RetrofitModel />
        </div>
      </div>
      <div className={styles.overviewColCenter}>
        <div className={styles.overviewItem} style={{ height: '10vw' }}>
          {/* 监狱犯人统计 */}
          <RecommendModel />
        </div>
        <div style={{ height: '40vw', marginBottom: 10 }}>
          {/* 地图模块 */}
          <Map />
        </div>
        <div className={styles.overviewItem} style={{ height: '17.5vw' }}>
          {/* 各监区关押犯人情况 */}
          <SituationModel />
        </div>
        <div className={styles.overviewItem} style={{ height: '20.5vw' }}>
          {/* 认罪悔罪评估 */}
          <PleadGuiltyModel />
        </div>
      </div>
      <div className={styles.overviewColNormal}>
        <div className={styles.overviewItem} style={{ height: '13vw' }}>
          {/* 再押犯人结构 */}
          <ReEscortStruct />
        </div>
        <div className={styles.overviewItem} style={{ height: '13vw' }}>
          {/* 五涉犯人统计 */}
          <FiveReModel />
        </div>
        <div className={styles.overviewItem} style={{ height: '20vw' }}>
          {/* 罪犯学历情况统计 */}
          <StructureModel />
        </div>
        <div className={styles.overviewItem} style={{ height: '20vw' }}>
          {/* 犯罪身心健康评估 */}
          <HealthModel />
        </div>
        <div className={styles.overviewItem} style={{ height: '21.5vw' }}>
          {/* 职业技术能力评估 */}
          <TechnologyModel />
        </div>
      </div>
    </div>
  );
};

export default Overview;
