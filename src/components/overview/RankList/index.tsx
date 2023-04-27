import rank1 from '@/assets/images/overview/rank1.png';
import rank2 from '@/assets/images/overview/rank2.png';
import rank3 from '@/assets/images/overview/rank3.png';
import useDragScroll from '@/hooks/useDragScroll';
import React from 'react';
import styles from './index.less';

const rankImg = [rank1, rank2, rank3];

interface IProps {
  data: string[];
  showRankTab?: boolean; // 1，2，3的图标
}

const RankList: React.FunctionComponent<IProps> = ({ data, showRankTab }) => {
  const domRef = useDragScroll();

  return (
    <div ref={domRef} className={styles.rankList}>
      {data.map((item, index) => (
        <div className={styles.rankItem} key={String(index)}>
          <div className={styles.before}>
            {showRankTab && rankImg[index] && (
              <>
                <img src={rankImg[index]} />
                <span>{index + 1}</span>
              </>
            )}
          </div>
          {item}
        </div>
      ))}
    </div>
  );
};

RankList.defaultProps = {
  showRankTab: true,
};

export default RankList;
