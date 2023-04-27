import { Modal, Tabs } from 'antd';
import React, { useState } from 'react';
import Configs from './components/Configs';
import CustomMenu from './components/CustomMenu';
import RoleEditModal from './components/RoleEditModal';
import Users from './components/Users';
import styles from './index.less';

const { TabPane } = Tabs;

const Converge: React.FunctionComponent = () => {
  const [roleEditVisible, setRoleEditVisible] = useState<boolean>(false);
  const [roleEditMode, setRoleEditMode] = useState<'edit' | 'add'>('add');

  const handleMenuActions = (key: string) => {
    if (key === 'add') {
      setRoleEditMode('add');
      setRoleEditVisible(true);
    }
    if (key === 'edit') {
      setRoleEditMode('edit');
      setRoleEditVisible(true);
    }
    if (key === 'del') {
      Modal.confirm({
        title: '您确定要删除“我是角色名称”吗？',
        content:
          '执行删除将清除角色及本角色所配置的权限，同时解除角色成员与角色的从属关系。原角色成员账户不会被删除。',
      });
    }
  };

  return (
    <div className={styles.wrap}>
      <CustomMenu defaultOpenKeys={['1']} onActions={handleMenuActions} />
      <div className={styles.content}>
        <div className={styles.header}>
          <p>自定义角色1</p>
          <p>我是自定义角色1#所录入的描述内容，显示在此处</p>
        </div>
        <div className={styles.hr}></div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="角色用户" key="1">
            <Users />
          </TabPane>
          <TabPane tab="权限配置" key="2">
            <Configs />
          </TabPane>
        </Tabs>
      </div>
      <RoleEditModal
        mode={roleEditMode}
        visible={roleEditVisible}
        onCancel={() => setRoleEditVisible(false)}
        onOk={() => setRoleEditVisible(false)}
      />
    </div>
  );
};

export default Converge;
