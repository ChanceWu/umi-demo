import useMenu2Content from '@/hooks/useMenu2Content';
import React, { useRef } from 'react';
import styles from './index.less';

interface IProps {
  title?: string;
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const InfoBlock: React.FunctionComponent<IProps & React.HTMLAttributes<HTMLDivElement>> = ({
  title,
  children,
  rightContent,
  ...props
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  useMenu2Content({
    title: title || '',
    key: String(Math.random()),
    ref: blockRef,
  });

  return (
    <div ref={blockRef} {...props} className={`${styles.wrap} ${props.className || ''}`}>
      {title && (
        <div className={styles.header}>
          <span>{title}</span>
          {rightContent}
        </div>
      )}
      <div style={{marginTop: 17, overflow: 'hidden'}}>
        {children}
      </div>
    </div>
  );
};

export default InfoBlock;
