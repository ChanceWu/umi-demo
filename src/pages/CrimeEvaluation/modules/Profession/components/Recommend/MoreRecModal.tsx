import type { ModalProps } from 'antd';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface IProps extends ModalProps {
  propData?: CrimeEvaluationType.OtherWork[];
}

const MoreRecModal: React.FunctionComponent<IProps> = ({ propData, ...props }) => {
  // table Columns
  const columns: ColumnsType<CrimeEvaluationType.OtherWork> = [
    {
      title: '工种',
      key: 'recommend_work',
      dataIndex: 'recommend_work',
      width: 100,
      align: 'center',
    },
    {
      title: '分数',
      key: 'recommend_score',
      dataIndex: 'recommend_score',
      width: 150,
      align: 'center',
    },
  ];

  return (
    <Modal title="推荐工种" width={650} footer={null} {...props}>
      <Table rowKey="id" size="small" columns={columns} dataSource={propData} />
    </Modal>
  );
};

export default MoreRecModal;
