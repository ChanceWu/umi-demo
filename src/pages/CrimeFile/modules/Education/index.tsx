import InfoBlock from '@/components/layout/InfoBlock';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useModel } from 'umi';

const Education: React.FunctionComponent = () => {
  const { dajlInfo } = useModel('crimeStore.crimeFile');
  // table Columns
  const columns: ColumnsType<CrimeFileType.DajlInfo> = [
    {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
      width: 50,
    },
    {
      title: '时间',
      key: 'date',
      dataIndex: 'date',
      width: 150,
    },
    {
      title: '事件',
      key: 'dwmx',
      dataIndex: 'dwmx',
      width: 150,
    },
    {
      title: '身份',
      key: 'bzy',
      dataIndex: 'bzy',
      width: 150,
    },
  ];

  return (
    <InfoBlock title="教育与工作情况">
      <Table
        rowKey="sort"
        size="small"
        bordered
        columns={columns}
        pagination={false}
        dataSource={dajlInfo?.map((item, index) => ({
          sort: index + 1,
          ...item,
        }))}
      />
    </InfoBlock>
  );
};

export default Education;
