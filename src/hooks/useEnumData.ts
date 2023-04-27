import useRefData from '@/hooks/useRefData';
import { ConvergeApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { useCallback, useState, useEffect } from 'react';
import useMount from './useMount';

export type DataKeys = keyof ReturnType<typeof usePartsData>;
export interface SearchPartsEnumType {
  label: string;
  value: string;
  children?: SearchPartsEnumType[];
}

const cacheMapEnumList: Record<string, SearchPartsEnumType[]> = {};

function usePartsData(initOptions: { dataKey: string, force?: boolean }[] = []) {
  const [mapEnumList, setMapEnumList] =
    useState<Record<string, SearchPartsEnumType[]>>(cacheMapEnumList);
  const { run } = useRequest(ConvergeApi.queryEnumList, {
    manual: true,
  });

  const mapRefData = useRefData(() => mapEnumList);

  const queryMapEnumList = useCallback(
    async (dataKey: string) => {
      const list = await run(
        formatParams({
          type: dataKey,
          pageSize: 9999,
        }),
      );
      mapRefData.current[dataKey] = list.resultList;
      setMapEnumList({ ...mapRefData.current });
    },
    [mapRefData, run],
  );

  // 缓存
  useEffect(() => {
    Object.assign(cacheMapEnumList, mapEnumList);
  }, [mapEnumList]);

  const getMapEnumList = useCallback(
    async (dataKey: string, force: boolean = false) => {
      if (mapRefData.current[dataKey] && !force) return;
      await queryMapEnumList(dataKey);
    },
    [mapRefData, queryMapEnumList],
  );

  // 初始化使用，就不需要在业务中单独初始化了
  useMount(() => {
    initOptions.forEach((option) => {
      getMapEnumList(option.dataKey, option.force)
    })
  })

  return {
    mapEnumList,
    queryMapEnumList,
    getMapEnumList,
  };
}

export default usePartsData;
