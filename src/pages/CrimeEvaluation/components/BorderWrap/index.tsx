import React from 'react'
import styles from './index.less'

interface IProps {
  children?: React.ReactNode;
}

const BorderWrap: React.FunctionComponent<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={`${styles.borderWrap} ${className || ''}`} {...props}>
    {children}
  </div>
)

export default BorderWrap
