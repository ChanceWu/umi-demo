import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

const Block: React.FunctionComponent<IProps> = ({ children, ...rest }) => {
  console.log(rest);
  return <>{children}</>;
};

export default Block;
