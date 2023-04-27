import { Button, Form, Input, Select, Table } from 'antd';
import React, { useState } from 'react';
import AddMembersModal from '../AddMembersModal';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    username: 'huyanb',
    idCard: 512264656231,
    email: '154654654@qq.com',
    part: '四川邑区监狱',
    organ: '第一部',
  },
  {
    key: '2',
    name: '胡彦斌',
    username: 'huyanb',
    idCard: 512264656231,
    email: '154654654@qq.com',
    part: '四川邑区监狱',
    organ: '第一部',
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

const Users: React.FunctionComponent = () => {
  const [addMemberVisible, setAddMemberVisible] = useState<boolean>(false);
  const [selectList, setSelectList] = useState<React.Key[]>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectList(selectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Form layout="inline">
        {/* <Form.Item label="用户状态">
                  <Select style={{width: 160}} defaultValue="2" options={[
                      { label: '全部', value: '2' },
                      { label: '选项', value: '1' }
                  ]} />
              </Form.Item> */}
        <Form.Item>
          <Input.Search
            style={{ width: 300 }}
            placeholder="请输入关键词搜索"
            addonBefore={
              <Select
                defaultValue="2"
                options={[
                  { label: '用户名', value: '2' },
                  { label: '姓名', value: '1' },
                  { label: '所属单位', value: '3' },
                ]}
              />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={() => setAddMemberVisible(true)}>添加角色成员</Button>
          <Button
            type="dashed"
            style={{ marginLeft: '12px' }}
            danger
            disabled={selectList.length === 0}
          >
            批量移除
          </Button>
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: 20 }}
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        scroll={{ y: 'calc(100vh - 430px)' }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `共${total}条`,
        }}
      />
      <AddMembersModal
        visible={addMemberVisible}
        onOk={() => setAddMemberVisible(false)}
        onCancel={() => setAddMemberVisible(false)}
      />
    </div>
  );
};

export default Users;
