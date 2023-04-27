import type { ColumnGroupType, ColumnType } from 'antd/lib/table/interface';

// 返回函数，可以覆盖设置columns
function setColumn<T>(data: ColumnGroupType<T> | ColumnType<T>) {
  return (key?: string, assignData: ColumnGroupType<T> | ColumnType<T> = {}) => {
    const result = {
      ...data,
      dataIndex: key,
      ...assignData,
    };
    if (key) {
      result.key = key;
    }
    return result;
  };
}

const columns: Record<string, ReturnType<typeof setColumn>> = {};

columns.ID = setColumn({
  title: 'ID',
  dataIndex: 'key1',
  key: 'key1',
  width: 100,
});

export function getColumn(title: string): ReturnType<typeof setColumn> {
  if (columns[title]) return columns[title];
  return setColumn({
    title,
    width: 200,
    ellipsis: true,
  });
}
