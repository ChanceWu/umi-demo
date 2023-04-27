import useEnumData from '@/hooks/useEnumData';
import { useEffect, useMemo } from 'react';

export default () => {
  // 监狱列表
  const { mapEnumList, getMapEnumList } = useEnumData();

  useEffect(() => {
    getMapEnumList('source_prison');
  }, [getMapEnumList]);

  const prisonAreaList = useMemo(() => {
    const prisonList = mapEnumList.source_prison || [];
    if (prisonList[0]) {
      const aList = prisonList[0].children || [];
      return aList;
    }
    return [];
  }, [mapEnumList.source_prison]);

  return {
    prisonList: mapEnumList.source_prison || [],
    prisonAreaList,
  };
};
