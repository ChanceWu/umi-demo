import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import React from 'react';
import DangerList from '../DangerList';
import type { Person } from '../RoomBlock';
import styles from './index.less';
import PrisonBed from './prisonBed';

interface IProps extends ModalProps {
  data: any[];
}

const persons: Person[] = [
  { name: '张三', status: 'status1' },
  {},
  { name: '张三', status: 'status2' },
  { name: '张三', status: 'status3' },
  {},
  { name: '张三', status: 'status4' },
  { name: '张三', status: 'status5' },
  { name: '张三', status: 'status6' },
  { name: '张三', status: 'status4' },
  { name: '张三', status: 'status5' },
  { name: '张三', status: 'status6' },
];

const PrisonModal: React.FunctionComponent<IProps> = ({ data, ...props }) => {
  return (
    <Modal title={`301监舍（11人）`} visible={true} width={740} footer={null} {...props}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <DangerList />
      </div>
      <div className={styles.wrap}>
        {persons.map((item, index) => (
          <PrisonBed data={item} key={String(index)} />
        ))}
      </div>
    </Modal>
  );
};

export default PrisonModal;
