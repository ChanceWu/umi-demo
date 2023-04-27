import InfoBlock from '@/components/layout/InfoBlock';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useModel } from 'umi';

const Disease: React.FunctionComponent = () => {
  const { diseaseInfo } = useModel('crimeStore.crimeFile');
  // table Columns
  const columns: ColumnsType<CrimeFileType.DiseaseInfo> = [
    {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
      width: 50,
    },
    {
      title: '就医时间',
      key: 'date',
      dataIndex: 'date',
      width: 150,
    },
    {
      title: '就医医院',
      key: 'JYDD',
      dataIndex: 'JYDD',
      width: 150,
    },
    {
      title: '疾病详情',
      key: 'LJJYYY',
      dataIndex: 'LJJYYY',
      width: 150,
    },
  ];

  return (
    <InfoBlock title="疾病史">
      <Table
        rowKey="sort"
        bordered
        size="small"
        columns={columns}
        pagination={false}
        dataSource={diseaseInfo?.map((item, index) => ({
          sort: index + 1,
          ...item,
        }))}
      />
    </InfoBlock>
  );
};

export default Disease;
