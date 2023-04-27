import type { ModalProps } from 'antd';
import { Input, Modal, Table } from 'antd';
import React from 'react';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
  },
  {
    key: '2',
    name: '胡彦祖',
  },
  {
    key: '3',
    name: '胡彦祖',
  },
  {
    key: '4',
    name: '胡彦祖',
  },
  {
    key: '5',
    name: '胡彦祖',
  },
  {
    key: '6',
    name: '胡彦祖',
  },
  {
    key: '7',
    name: '胡彦祖',
  },
];

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'uesrname',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    key: 'idCard',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '所属单位',
    dataIndex: 'part',
    key: 'part',
  },
  {
    title: '所属部门',
    dataIndex: 'organ',
    key: 'organ',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

interface IProps extends ModalProps {}

const AddMembersModal: React.FunctionComponent<IProps> = ({ ...props }) => {
  return (
    <Modal title="选择添加用户" width={700} {...props}>
      <Input.Search placeholder="输入姓名检索" style={{ width: 200, marginBottom: 20 }} />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          ...rowSelection,
        }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共${total}条`,
        }}
      />
    </Modal>
  );
};

export default AddMembersModal;
