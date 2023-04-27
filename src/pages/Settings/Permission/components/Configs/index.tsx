import { SettingOutlined } from '@ant-design/icons';
import { Form, Radio, Switch } from 'antd';
import React from 'react';
import styles from './index.less';

const Configs: React.FunctionComponent = () => (
  <Form layout="inline">
    <div className={styles.item}>
      <div className={styles.left}>可见数据范围：</div>
      <div className={styles.content}>
        <div className={styles.row}>
          <Form.Item>
            <Radio.Group>
              <Radio value={1}>所在监狱监区</Radio>
              <Radio value={2}>所在监狱</Radio>
              <Radio value={3}>指定可见（可自定义多个监狱监区）</Radio>
            </Radio.Group>
          </Form.Item>
          <SettingOutlined style={{ color: 'white', cursor: 'pointer' }} />
        </div>
        <div>可见数据范围为该角色在本系统的数据可查看范围</div>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.left}>数据总览：</div>
      <div className={styles.content}>
        <div>设置权限仅对可见范围生效</div>
        <div className={styles.row}>
          <Form.Item label="可见：">
            <Switch />
          </Form.Item>
        </div>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.left}>罪犯库列表：</div>
      <div className={styles.content}>
        <div>设置权限仅对可见范围生效</div>
        <div className={styles.row}>
          <Form.Item label="分配：">
            <Switch />
          </Form.Item>
          <Form.Item label="转交：">
            <Switch />
          </Form.Item>
          <Form.Item label="启动/停止：">
            <Switch defaultChecked />
          </Form.Item>
        </div>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.left}>罪犯档案</div>
      <div className={styles.content}>
        <div>设置权限仅对可见范围生效</div>
        <div className={styles.row}>
          <Form.Item label="下载：">
            <Switch />
          </Form.Item>
        </div>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.left}>数据汇聚：</div>
      <div className={styles.content}>
        <div>设置权限仅对可见范围生效</div>
        <div className={styles.row}>
          <Form.Item label="导出为excel：">
            <Switch />
          </Form.Item>
        </div>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.left}>权限管理：</div>
      <div className={styles.content}>
        <div className={styles.row}>
          <Form.Item label="角色管理：">
            <Switch />
          </Form.Item>
          <Form.Item label="权限配置：">
            <Switch />
          </Form.Item>
        </div>
      </div>
    </div>
  </Form>
);

export default Configs;
