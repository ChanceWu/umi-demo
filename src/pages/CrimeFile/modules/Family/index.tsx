import InfoBlock from '@/components/layout/InfoBlock';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useModel } from 'umi';

const Family: React.FunctionComponent = () => {
  const { familyInfo } = useModel('crimeStore.crimeFile');
  // table Columns
  const columns: ColumnsType<CrimeFileType.FamilyInfo> = [
    {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
      width: 50,
    },
    {
      title: '关系',
      key: 'GXLBNAME',
      dataIndex: 'GXLBNAME',
      width: 150,
    },
    {
      title: '称调',
      key: 'CW',
      dataIndex: 'CW',
      width: 150,
    },
    {
      title: '亲属姓名',
      key: 'XM',
      dataIndex: 'XM',
      width: 150,
    },
    {
      title: '年龄',
      key: 'AGE',
      dataIndex: 'AGE',
      width: 150,
    },
    {
      title: '出生日期',
      key: 'CSRQ',
      dataIndex: 'CSRQ',
      width: 150,
    },
    {
      title: '电话号码',
      key: 'DH',
      dataIndex: 'DH',
      width: 150,
    },
    {
      title: '现住地址',
      key: 'FAMILYADDRESS',
      dataIndex: 'FAMILYADDRESS',
      width: 150,
    },
  ];

  return (
    <InfoBlock title="家庭情况">
      <Table
        rowKey="sort"
        bordered
        size="small"
        columns={columns}
        pagination={false}
        dataSource={familyInfo?.map((item, index) => ({
          sort: index + 1,
          ...item,
        }))}
      />
    </InfoBlock>
  );
};

export default Family;
