import type { ModalProps } from 'antd';
import { Modal, Table } from 'antd';
import React from 'react';

const dataSource = [
  {
    key: '1',
    key1: '2021.05.30 14:21',
    key2: '无风险',
  },
  {
    key: '2',
    key1: '2021.05.30 14:21',
    key2: '无风险',
  },
  {
    key: '3',
    key1: '2021.05.30 14:21',
    key2: '无风险',
  },
  {
    key: '4',
    key1: '2021.05.30 14:21',
    key2: '无风险',
  },
  {
    key: '5',
    key1: '2021.05.30 14:21',
    key2: '无风险',
  },
];

const columns = [
  {
    title: '评估时间',
    dataIndex: 'key1',
    key: 'key1',
  },
  {
    title: '评估结果',
    dataIndex: 'key2',
    key: 'key2',
  },
  {
    title: '操作',
    dataIndex: 'key3',
    key: 'key3',
    render: () => <a>查看详情</a>,
  },
];

const MoreEvaluation: React.FunctionComponent<ModalProps> = ({ ...props }) => {
  return (
    <Modal title="历史评估结果" width={700} footer={null} {...props}>
      <Table dataSource={dataSource} columns={columns} />
    </Modal>
  );
};

export default MoreEvaluation;
