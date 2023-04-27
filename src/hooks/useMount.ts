import { useEffect, useRef } from 'react';

/**
 * 只在第一次渲染后执行
 * 会返回一个渲染标识isMount，isMount.current为true代表不是第一次渲染
 */
export default (callback?: () => void) => {
  const isMount = useRef<boolean>(false);

  useEffect(() => {
    // 只执行第一次
    if (!isMount.current && callback && typeof callback === 'function') {
      callback();
    }
    return () => {
      isMount.current = true;
    };
  }, [callback]);

  return isMount;
};
