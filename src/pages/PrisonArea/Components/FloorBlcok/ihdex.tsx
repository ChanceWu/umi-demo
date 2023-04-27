// import TrapezoidButton from '@/components/common/TrapezoidButton';
import useMenu2Content from '@/hooks/useMenu2Content';
import React, { useRef } from 'react';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

const FloorBlock: React.FunctionComponent<IProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  useMenu2Content({
    title: props.title,
    key: String(Math.random()),
    ref,
  });
  return (
    <div ref={ref}>
      {/* <TrapezoidButton list={[{ title: props.title }]} /> */}
      {props.children}
    </div>
  );
};

export default FloorBlock;
