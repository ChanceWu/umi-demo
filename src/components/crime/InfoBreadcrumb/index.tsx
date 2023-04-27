import React from 'react'
import { Breadcrumb } from 'antd'
import styles from './index.less';

interface IProps {
  list: { title: string }[]
}

const InfoBreadcrumb: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className={styles.breadWrap}>
      <span className={styles.label}>当前位置：</span>
      <Breadcrumb separator=">">
        {
          props.list.map((item, index) => (
            <Breadcrumb.Item key={String(index)}>{item.title}</Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    </div>
  )
}

export default InfoBreadcrumb
