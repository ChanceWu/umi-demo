import { useState, useRef } from 'react';
import { useHistory } from 'umi';

/**
 * 通过state的方式控制路由query某一个值的变更
 */
export default (key: string, defaultValue: string = ''): [string, (val: string) => void] => {
  const history = useHistory();
  const url = useRef(new URL(window.location.href));
  const [value, setValue] = useState<string>(url.current.searchParams.get(key) || defaultValue);

  const setState = (val: string) => {
    url.current.searchParams.set(key, val);
    history.push({
      search: url.current.search,
    });
    setValue(val);
  };

  return [value, setState];
};
