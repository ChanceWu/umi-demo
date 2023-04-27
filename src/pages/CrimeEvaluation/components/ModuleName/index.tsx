import React from 'react';
import styles from './index.less';

interface IProps {
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const ModuleName: React.FunctionComponent<IProps & React.HTMLAttributes<HTMLDivElement>> = ({
  rightContent,
  children,
  className,
  ...props
}) => (
  <div className={`${styles.moduleName} ${className || ''}`} {...props}>
    <span>{children}</span>
    {rightContent}
  </div>
);

export default ModuleName;
