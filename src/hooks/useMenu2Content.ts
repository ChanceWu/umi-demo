import { useUnmount } from 'ahooks';
import { throttle } from 'lodash-es';
import { useCallback, useEffect, useRef, useState } from 'react';
import useRefData from './useRefData';

interface MenuItem {
  title: string;
  key: string;
  ref: React.RefObject<HTMLDivElement>;
}

class MenuList {
  list: MenuItem[] = [];
  callback: ((m: MenuItem[]) => void)[] = [];

  register(item: MenuItem) {
    this.list.push(item);
    this.emit();
  }

  getAll() {
    return [...this.list];
  }

  unregister(item: MenuItem) {
    const curIndex = this.list.findIndex((l) => l === item);
    if (curIndex !== -1) {
      this.list.splice(curIndex, 1);
      this.emit();
    }
  }

  clear() {
    this.list = [];
    this.callback = [];
    this.emit();
  }

  emit() {
    this.callback.forEach((cal) => {
      cal([...this.list])
    })
  }

  on(callback: (m: MenuItem[]) => void) {
    this.callback.push(callback);
  }
}

const cacheMenuList = new MenuList();
const cacheScrollWrapRef = {
  ref: window.document.documentElement,
};

export default (registerObj?: MenuItem) => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const scrollWrapRef = useRef<HTMLElement>(cacheScrollWrapRef.ref);
  const [activeKey, setActiveKey] = useState<string>('');
  const lock = useRef(false);
  const prevScrollTop = useRef(0);

  const refData = useRefData(() => ({
    registerObj,
    menuList,
    activeKey,
  }));

  // 处理容器ref更新
  useEffect(() => {
    scrollWrapRef.current = cacheScrollWrapRef.ref;
  });

  const setScrollRef = useCallback((dom: HTMLElement) => {
    cacheScrollWrapRef.ref = dom;
    scrollWrapRef.current = dom;
  }, []);

  // menu组件使用，主要用于数据响应
  useEffect(() => {
    const register = refData.current.registerObj;
    if (!register) {
      cacheMenuList.on((list) => {
        setMenuList(list);
        if (list[0]) setActiveKey(list[0].key);
      });
    }
  }, [refData]);

  // 内容组件注册使用
  useEffect(() => {
    const register = refData.current.registerObj;
    if (register) {
      cacheMenuList.register(register);
    }
    return () => {
      if (register) {
        cacheMenuList.unregister(register);
      }
    };
  }, [refData]);

  // 用于解决手动滚动和点击滚动的冲突，主要设置lock
  useEffect(() => {
    // 只在menu端调用
    if (refData.current.registerObj) return () => {};
    const scrollWrap = scrollWrapRef.current;
    let count = 0;
    const timer = setInterval(() => {
      const curScrollTop = scrollWrap?.scrollTop || 0;
      if (prevScrollTop.current === curScrollTop) {
        count += 1;
        if (count === 3) {
          lock.current = false;
          count = 0;
        }
      }
      prevScrollTop.current = curScrollTop;
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, [refData]);

  // 监听滚动事件，设置active menu
  useEffect(() => {
    // 只在menu端调用
    if (refData.current.registerObj) return () => {};
    const scrollWrap = scrollWrapRef.current;
    const onScroll = () => {
      const curScrollTop = scrollWrap?.scrollTop || 0;
      if (lock.current) return;
      const list = refData.current.menuList.map((item) => {
        const { ref } = item;
        const offsetTop = (ref.current?.offsetTop || 0) - (scrollWrap?.offsetTop || 0) - 20;
        return {
          offsetTop,
          offsetHeight: ref.current?.offsetHeight,
        };
      });
      for (let i = 0; i < list.length; i += 1) {
        if (
          curScrollTop >= list[i].offsetTop &&
          curScrollTop < (list[i + 1] ? list[i + 1].offsetTop : 999999999)
        ) {
          setActiveKey(refData.current.menuList[i].key);
          break;
        }
      }
    };
    const thScrollHandle = throttle(onScroll, 200);
    const eventDom =
      scrollWrapRef.current === window.document.documentElement
        ? window.document
        : scrollWrapRef.current;
    eventDom.addEventListener('scroll', thScrollHandle);
    thScrollHandle(); // 初始化执行
    return () => {
      eventDom.removeEventListener('scroll', thScrollHandle);
    };
  }, [refData]);

  // 跳转到对应的内容部分
  const scrollTOTop = useCallback((item: MenuItem) => {
    const { ref, key } = item;
    setActiveKey(key);
    const scrollWrap = scrollWrapRef.current;
    const offsetTop = (ref.current?.offsetTop || 0) - (scrollWrap?.offsetTop || 0) - 20;
    scrollWrap.scrollTo({ top: offsetTop ?? 0, behavior: 'smooth' });
    lock.current = true;
  }, []);

  useUnmount(() => {
    if (!refData.current.registerObj) {
      cacheMenuList.clear();
      cacheScrollWrapRef.ref = document.documentElement;
      setMenuList([]);
      lock.current = false;
      prevScrollTop.current = 0;
      setActiveKey('');
    }
  });

  return {
    activeKey,
    menuList,
    scrollWrapRef,
    scrollTOTop,
    setScrollRef,
  };
};
