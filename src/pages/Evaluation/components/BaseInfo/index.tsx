import { minioPrefix } from '@/utils/config';
import { Image } from 'antd';
import moment from 'moment';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

interface IProps {
  rightContent?: (baseInfo?: Partial<EvaluationTypes.AssessInfo>) => React.ReactNode;
  rightContentStyle?: React.CSSProperties;
  extraInfo?: (baseInfo?: Partial<EvaluationTypes.AssessInfo>) => React.ReactNode;
}

const BaseInfo: React.FunctionComponent<IProps> = ({
  rightContent,
  rightContentStyle,
  extraInfo,
}) => {
  const { baseInfo } = useModel('evaluation.common');

  return (
    <div>
      <div className={styles.row}>
        <div className={styles.imgWrap}>
          <Image
            preview={!!baseInfo.photo_file}
            width={102}
            height={136}
            src={
              baseInfo.photo_file
                ? `${minioPrefix}${baseInfo.photo_file}`
                : require('@/assets/images/common/noImg.png')
            }
          />
        </div>
        <div className={styles.content}>
          <div className={styles.rowText}>
            <span className={styles.name}>
              {baseInfo.name || '无'}
              <span className={styles.label} style={{ marginLeft: 20 }}>
                {baseInfo.crime_name || '无'}
              </span>
            </span>
          </div>
          <div className={styles.rowText}>
            <span>
              档案编号：<span>{baseInfo.id || '无'}</span>
            </span>
            {/* <span>身份号：{baseInfo.id_num || '无'}</span> */}
            <span>
              性别：<span>{baseInfo.sex || '无'}</span>
            </span>
            <span>
              年龄：
              <span>
                {baseInfo.crime_age || '无'}{' '}
                {baseInfo.birthday ? `(${moment(baseInfo.birthday).format('YYYY/MM/DD')})` : ''}
              </span>
            </span>
            <span>
              累惯犯：
              <span style={{ padding: '2px 15px', background: '#F8B044', color: '#fff' }}>
                {baseInfo.crime_lg}
              </span>
            </span>
            <span>
              原判刑期：<span>{baseInfo.xq}</span>
            </span>
            {extraInfo && extraInfo(baseInfo)}
          </div>
        </div>
        <div className={styles.rightContent} style={rightContentStyle}>
          {rightContent && rightContent(baseInfo)}
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
