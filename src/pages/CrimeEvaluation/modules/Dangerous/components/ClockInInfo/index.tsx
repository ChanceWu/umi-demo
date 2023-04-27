import XgPlayerModal from '@/components/common/XgPlayer/XgPlayerModal';
import ModuleName from '@/pages/CrimeEvaluation/components/ModuleName';
import React, { useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import MoreClockModal from './MoreClockModal';

const ClockInInfo: React.FunctionComponent = () => {
  const { riskInfo } = useModel('crimeStore.evaluation');
  const [moreVisible, setMoreVisible] = useState<boolean>(false);
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>('');

  const handleClickVideo = (src: string) => {
    setVideoSrc(src);
    setVideoVisible(true);
  }

  return (
    <>
      <ModuleName rightContent={<a onClick={() => setMoreVisible(true)}>{'更多>>'}</a>}>
        打卡信息
      </ModuleName>
      <div className={styles.gridWrap}>
        {riskInfo?.clock.slice(0, 6).map((item, index) => (
          <div className={styles.clockItem} key={String(index)}>
            <span>{item.create_date}</span>
            <video src={item.video_path} onClick={() => handleClickVideo(item.video_path)}></video>
            <span>{item.analy_result}</span>
          </div>
        ))}
      </div>
      <MoreClockModal
        visible={moreVisible}
        propData={riskInfo?.clock}
        onCancel={() => setMoreVisible(false)}
      />
      <XgPlayerModal src={videoSrc} visible={videoVisible} onCancel={() => setVideoVisible(false)}/>
    </>
  );
};

export default ClockInInfo;
