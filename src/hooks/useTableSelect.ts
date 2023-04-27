/**
 * 表格多选功能
 */
import type { TableRowSelection } from 'antd/es/table/interface';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useMount from './useMount';
import useRefData from './useRefData';

export default <T>(mapKey: number = 0, options: TableRowSelection<T> = {}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Record<string | number, React.Key[]>>({});
  const [selectedRowDatas, setSelectedRowDatas] = useState<Record<string | number, T[]>>({});
  const rowSelection = useRef<TableRowSelection<T>>({});
  const dataRef = useRefData(() => ({
    mapKey,
    selectedRowKeys,
    options,
    selectedRowDatas,
  }));

  useMount(() => {
    rowSelection.current = {
      ...dataRef.current.options,
      onChange: (keys: React.Key[], rows) => {
        rowSelection.current.selectedRowKeys = keys;
        // 记录key数组
        dataRef.current.selectedRowKeys[dataRef.current.mapKey] = keys;
        setSelectedRowKeys({ ...dataRef.current.selectedRowKeys });
        // 记录data数组
        dataRef.current.selectedRowDatas[dataRef.current.mapKey] = rows;
        setSelectedRowDatas({ ...dataRef.current.selectedRowDatas });
      },
    };
  });

  useEffect(() => {
    if (dataRef.current.selectedRowKeys[dataRef.current.mapKey]) {
      rowSelection.current.selectedRowKeys =
        dataRef.current.selectedRowKeys[dataRef.current.mapKey];
    } else {
      rowSelection.current.selectedRowKeys = [];
    }
  }, [dataRef, mapKey]);

  const realSelectedRowKeys = useMemo(() => {
    return Object.values(selectedRowKeys).flat();
  }, [selectedRowKeys]);

  const realSelectedRowDatas = useMemo(() => {
    return Object.values(selectedRowDatas).flat();
  }, [selectedRowDatas]);

  const clearAll = useCallback(() => {
    setSelectedRowKeys({});
    setSelectedRowDatas({});
    rowSelection.current.selectedRowKeys = [];
  }, []);

  const removeOne = useCallback(
    (id: React.Key) => {
      if (!dataRef.current.selectedRowKeys[dataRef.current.mapKey]) return;
      const index = dataRef.current.selectedRowKeys[dataRef.current.mapKey].findIndex(
        (key) => key === id,
      );
      if (index !== -1) {
        dataRef.current.selectedRowKeys[dataRef.current.mapKey].splice(index, 1);
        dataRef.current.selectedRowDatas[dataRef.current.mapKey].splice(index, 1);
        setSelectedRowKeys({ ...dataRef.current.selectedRowKeys });
        setSelectedRowDatas({ ...dataRef.current.selectedRowDatas });
      }
    },
    [dataRef],
  );

  return {
    rowSelection: rowSelection.current,
    selectedRowKeys: realSelectedRowKeys,
    selectedRowDatas: realSelectedRowDatas,
    removeOne,
    clearAll,
  };
};
