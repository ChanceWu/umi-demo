/**
 * 监听dom出现消失在窗口
 */

import { useUnmount } from 'ahooks';
import { throttle } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

const scrollWrapRef = {
  current: document.documentElement,
};

export default () => {
  const [status, setStatus] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = ref.current?.getBoundingClientRect(); // vue中，使用this.$el获取当前组件的根元素
      const wrapOffset = scrollWrapRef.current.getBoundingClientRect();
      if (offset) {
        // 进入可视区域
        if (offset.top < wrapOffset.top && offset.bottom > wrapOffset.top) {
          setStatus(true);
        } else if (offset.bottom > wrapOffset.bottom && offset.top < wrapOffset.bottom) {
          setStatus(true);
        } else if (offset.top >= wrapOffset.top && offset.bottom < wrapOffset.bottom) {
          // console.log('进入可视区域');
          setStatus(true);
        } else {
          // console.log('移出可视区域');
          setStatus(false);
        }
      }
    };
    const thHandleScroll = throttle(handleScroll, 200);
    scrollWrapRef.current.addEventListener('scroll', thHandleScroll);
    thHandleScroll(); // 初始化执行下

    return () => {
      scrollWrapRef.current.removeEventListener('scroll', thHandleScroll);
    };
  }, []);

  useUnmount(() => {
    scrollWrapRef.current = document.documentElement;
  });

  const setScrollWrap = (dom: HTMLDivElement | HTMLElement) => {
    scrollWrapRef.current = dom;
  };

  return {
    ref,
    status,
    setScrollWrap,
  };
};
