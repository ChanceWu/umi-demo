import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';

interface IProps {
  src?: string;
}

const BottomDownload: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className={styles.bottomWrap}>
      <a href={props.src} download={props.src?.split('/').reverse()[0]}>
        <Button type="primary">
          <DownloadOutlined />
          下载报告
        </Button>
      </a>
    </div>
  );
};

export default BottomDownload;
