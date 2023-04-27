import { useEffect, useState } from 'react';
import useRefData from './useRefData';

export default <T = string>(key: string, value?: T) => {
  const [retVal, setRetVal] = useState<T | undefined | null>(undefined);
  const refs = useRefData(() => ({
    value,
  }));

  useEffect(() => {
    if (!refs.current.value) {
      const ret: unknown = window.localStorage.getItem(key);
      if (ret) {
        try {
          setRetVal(JSON.parse(ret as string));
        } catch (error) {
          setRetVal(ret as T);
        }
      }
    } else if (typeof refs.current.value === 'string') {
      window.localStorage.setItem(key, refs.current.value);
      setRetVal(refs.current.value);
    } else if (refs.current.value) {
      window.localStorage.setItem(key, JSON.stringify(refs.current.value));
      setRetVal(refs.current.value);
    }
  }, [key, refs]);

  return retVal;
};
