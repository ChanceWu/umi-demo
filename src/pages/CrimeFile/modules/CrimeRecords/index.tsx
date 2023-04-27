import InfoBlock from '@/components/layout/InfoBlock';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useModel } from 'umi';

const CrimeRecords: React.FunctionComponent = () => {
  const { recordInfo } = useModel('crimeStore.crimeFile');
  // table Columns
  const columns: ColumnsType<CrimeFileType.RecordInfo> = [
    {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
      width: 50,
    },
    {
      title: '前科类型',
      key: 'CFLBNAME',
      dataIndex: 'CFLBNAME',
      width: 150,
    },
    {
      title: '原判刑期',
      key: 'YPXQ',
      dataIndex: 'YPXQ',
      width: 150,
    },
    {
      title: '罪名',
      key: 'ACCUSATIONNAME',
      dataIndex: 'ACCUSATIONNAME',
      width: 150,
    },
    {
      title: '执行起日',
      key: 'QR',
      dataIndex: 'QR',
      width: 150,
    },
    {
      title: '执行止日',
      key: 'ZR',
      dataIndex: 'ZR',
      width: 150,
    },
  ];

  return (
    <InfoBlock title="犯罪前科">
      <Table
        rowKey="sort"
        size="small"
        bordered
        columns={columns}
        pagination={false}
        dataSource={recordInfo?.map((item, index) => ({
          sort: index + 1,
          ...item,
        }))}
      />
    </InfoBlock>
  );
};

export default CrimeRecords;
