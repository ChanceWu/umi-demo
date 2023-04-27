import XgPlayer from '@/components/common/XgPlayer';
import InfoBlock from '@/components/layout/InfoBlock';
import React, { useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const CrimeVideo: React.FunctionComponent = () => {
  const { videoInfo } = useModel('crimeStore.crimeFile');
  const [selectIndex, setSelectIndex] = useState<number>(0);

  return (
    <InfoBlock title="犯罪前科">
      <div className={styles.wrap}>
        <div className={styles.video}>
          <XgPlayer src={videoInfo[selectIndex] ? videoInfo[selectIndex].video_path : ''} options={{ autoplay: false }} />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>犯罪视频集</div>
          <div className={styles.videoList}>
            {videoInfo.map((item, index) => (
              <div
                className={index === selectIndex ? styles.listItemActive : styles.listItem}
                key={String(index)}
                onClick={() => setSelectIndex(index)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </InfoBlock>
  );
};

export default CrimeVideo;
