import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const ChangeTable: React.FunctionComponent = () => {
  const { technolog } = useModel('crimeStore.evaluation');
  const columns: ColumnsType<EvaluationTypes.JobChange> = [
    {
      title: '日期',
      dataIndex: 'createdate',
      key: 'createdate',
    },
    {
      title: '工种变更',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '级别变更',
      dataIndex: 'change',
      key: 'change',
      render: (change: string) => {
        return change === '上调' ? (
          <span style={{ color: '#6BC642' }}>
            <ArrowUpOutlined />
            上调
          </span>
        ) : (
          <span style={{ color: '#EF6665' }}>
            <ArrowDownOutlined />
            下调
          </span>
        );
      },
    },
  ];
  return (
    <div className={styles.changeTableWrap}>
      <span>工种级别变更</span>
      <Table
        rowKey="id"
        dataSource={technolog?.work_change || []}
        columns={columns}
        size="small"
        pagination={false}
        scroll={{ y: '19.5vw' }}
        bordered
      />
    </div>
  );
};

export default ChangeTable;
