import InfoStickyMenu from '@/components/common/InfoStickyMenu';
import React from 'react';
import styles from './index.less';

interface IProps {
  menuStickyTop?: number;
  children?: React.ReactNode;
}

const InfoList: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className={styles.infoList}>
      <div>
        <InfoStickyMenu stickyTop={props.menuStickyTop} />
      </div>
      <div className={styles.modules}>{props.children}</div>
    </div>
  );
};

export default InfoList;
