import { useEffect, useRef } from 'react';

/**
 * 将数据转为ref，这样不会强制依赖
 */
export default <T>(callback: () => T) => {
  const data = callback();
  const ref = useRef(data);

  // 每次渲染都会刷新
  useEffect(() => {
    ref.current = data;
  }, [data]);

  return ref;
};
