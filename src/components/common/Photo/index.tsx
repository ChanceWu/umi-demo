import type { ImageProps } from 'antd';
import { Image } from 'antd';
import React from 'react';
import styles from './index.less';

interface IProps {
  src?: string;
}

const Photo: React.FunctionComponent<IProps & ImageProps> = ({ src, ...props }) => (
  <div className={styles.imgWrap}>
    <Image
      width={102}
      height={136}
      src={src || require('@/assets/images/common/noImg.png')}
      {...props}
    />
  </div>
);

export default Photo;
