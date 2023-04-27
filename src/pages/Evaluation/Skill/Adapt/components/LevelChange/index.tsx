import React from 'react';
import { useModel } from 'umi';
import InfoBlock from '../../../../components/InfoBlock';
import styles from './index.less';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const LevelChange: React.FunctionComponent = () => {
  const { jobChange } = useModel('evaluation.job');
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
    <InfoBlock title="工种级别变更" style={{ height: 400 }}>
      <Table
        rowKey="id"
        dataSource={jobChange}
        columns={columns}
        size="small"
        className={styles.table}
        pagination={false}
        scroll={{ y: '265px' }}
        bordered
      />
    </InfoBlock>
  );
};

export default LevelChange;
