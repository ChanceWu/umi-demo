import { SnippetsOutlined } from '@ant-design/icons';
import React from 'react';
import { history } from 'umi';
import { dangerStatusList } from '../../DangerList';
import type { Person } from '../../RoomBlock';
import styles from './index.less';

interface IProps {
  data: Person;
}

const PrisonBed: React.FunctionComponent<IProps> = ({ data }) => {
  const routerTo = () => {
    history.push('/crimeFile');
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>一床上铺</div>
      <div className={styles.content}>
        {data.status && data.name ? (
          <>
            <div className={styles.top}>
              <div className={styles.dangerItem}>
                <div
                  className={styles.before}
                  style={{ backgroundColor: dangerStatusList[data.status].color }}
                ></div>
                罪犯姓名
              </div>
            </div>
            <div className={styles.bottom}>
              <div>档案号: 5120011483</div>
              <div>互监组号: 0510031</div>
            </div>
          </>
        ) : (
          <div className={styles.emptyWrap}>
            <img src={require('@/assets/images/common/empty.png')} />
            <span>暂无罪犯</span>
          </div>
        )}
      </div>
      {data.status && data.name && (
        <div className="hover">
          <div className={styles.actionButton} onClick={() => routerTo()}>
            <SnippetsOutlined style={{ fontSize: 20 }} />
            <span>查看档案</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrisonBed;
