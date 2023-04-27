import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import useRefData from './useRefData';

type Query = Record<string, string>;

function formatSearchParmasToQuery(searchParams: URLSearchParams): Query {
  const query: Query = {};
  searchParams.forEach((v, k) => {
    query[k] = v;
  });
  return query;
}

/**
 * 通过state的方式控制路由query
 */
export default (defaultValue: Query = {}): [Query, (val: Query) => void] => {
  const history = useHistory();
  const location = useLocation();
  const url = useRef(new URL(window.location.href));
  const [value, setValue] = useState<Query>({
    ...formatSearchParmasToQuery(url.current.searchParams),
    ...defaultValue,
  });

  const refs = useRefData(() => ({
    value,
  }))

  const setState = useCallback(
    (q: Query = {}) => {
      Object.keys(q).forEach((k) => {
        url.current.searchParams.set(k, q[k]);
      });
      if (location.search !== url.current.search) {
        history.push({
          search: url.current.search,
        });
      }
      setValue({
        ...refs.current.value,
        ...q,
      })
    },
    [history, location.search, refs],
  );

  // 监听url
  useEffect(() => {
    if (location.search !== url.current.search) {
      setValue(formatSearchParmasToQuery(url.current.searchParams));
    }
  }, [location.search]);

  return [value, setState];
};
