import type { ModalProps } from 'antd';
import { Form, Input, Modal } from 'antd';
import React from 'react';

interface IProps extends ModalProps {
  mode?: 'edit' | 'add';
}

const RoleEditModal: React.FunctionComponent<IProps> = ({ mode, ...props }) => {
  return (
    <Modal title={mode === 'add' ? '新增角色' : '编辑角色'} {...props}>
      <Form>
        <Form.Item label="角色名称">
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item label="角色名称">
          <Input.TextArea placeholder="请输入角色描述..." showCount />
        </Form.Item>
      </Form>
    </Modal>
  );
};

RoleEditModal.defaultProps = {
  mode: 'add',
};

export default RoleEditModal;
