import type { MenuItemInter } from '@/pages/Converge/data/menus';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Popover, Tooltip } from 'antd';
import React from 'react';
import styles from './index.less';

const { SubMenu } = Menu;

const menus: MenuItemInter[] = [
  {
    title: '角色管理',
    key: '1',
    children: [
      { title: '角色1', key: '1-1' },
      { title: '角色2', key: '1-2' },
      { title: '角色3', key: '1-3' },
      { title: '角色4', key: '1-4' },
      { title: '角色5', key: '1-5' },
      { title: '角色6', key: '1-6' },
      { title: '角色7', key: '1-7' },
    ],
  },
];

const ItemTitle: React.FunctionComponent<{ d: MenuItemInter; onSelect?: (key: string) => void }> =
  ({ d, onSelect }) => {
    const actions: { label: string; key: string }[] = [
      { label: '编辑角色', key: 'edit' },
      { label: '删除角色', key: 'del' },
    ];

    const handleClick = (key: string) => {
      if (onSelect) {
        onSelect(key);
      }
    };
    return (
      <div className={styles.itemTitleWrap}>
        {d.title}{' '}
        <Popover
          overlayClassName={styles.popover}
          placement="right"
          content={
            <div className={styles.moreActions} onClick={(e) => e.stopPropagation()}>
              {actions.map((item) => (
                <div key={item.key} onClick={() => handleClick(item.key)}>
                  {item.label}
                </div>
              ))}
            </div>
          }
        >
          <EllipsisOutlined className={styles.moreIcon} onClick={(e) => e.stopPropagation()} />
        </Popover>
      </div>
    );
  };

interface IProps extends MenuProps {
  onActions?: (key: string, menuItem: MenuItemInter) => void;
}

const CustomMenu: React.FunctionComponent<IProps> = ({ onActions, ...props }) => {
  const handleClick = (e: any, key: string, menuItem: MenuItemInter) => {
    if (e.stopPropagation) e.stopPropagation();
    if (onActions) onActions(key, menuItem);
  };

  return (
    <div className={styles.wrap}>
      <Menu
        style={{ width: 160 }}
        defaultSelectedKeys={['1-1']}
        mode="inline"
        openKeys={['1']}
        {...props}
      >
        {menus.map((item) => {
          if (item.children && item.children.length)
            return (
              <SubMenu
                key={item.key}
                icon={item.icon ? item.icon() : undefined}
                title={
                  <div className={styles.titleWrap}>
                    <span>{item.title}</span>
                    <Tooltip title="添加角色" placement="right">
                      <PlusOutlined onClick={(e) => handleClick(e, 'add', item)} />
                    </Tooltip>
                  </div>
                }
              >
                {item.children.map((d) => (
                  <Menu.Item key={d.key}>
                    <ItemTitle d={item} onSelect={(key) => handleClick({}, key, item)} />
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          return (
            <Menu.Item key={item.key} icon={item.icon ? item.icon() : undefined}>
              <ItemTitle d={item} onSelect={(key) => handleClick({}, key, item)} />
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default CustomMenu;
