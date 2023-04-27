import useTableSelect from '@/hooks/useTableSelect';
import { addAssessment } from '@/services/crimeStore';
import { formatParams } from '@/utils/utils';
import { useRequest } from 'ahooks';
import type { ModalProps } from 'antd';
import { Button, message, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useCallback, useMemo } from 'react';
import styles from './index.less';

interface IProps extends ModalProps {
  mode?: 'edit' | 'add';
  criminalCart: Record<string, CrimeStoreTypes.CrimyInfo>;
  setCriminalCart: React.Dispatch<React.SetStateAction<Record<string, CrimeStoreTypes.CrimyInfo>>>;
}

const CartListModal: React.FunctionComponent<IProps> = ({ mode, ...props }) => {
  const { rowSelection, selectedRowKeys, removeOne } = useTableSelect<CrimeStoreTypes.CrimyInfo>();
  const dataSource = useMemo(() => {
    return Object.values(props.criminalCart || {});
  }, [props.criminalCart]);
  const { run, loading } = useRequest(addAssessment, {
    manual: true,
  });

  // 删除单个
  const handleDelCriminal = useCallback(
    (id: string) => {
      removeOne(id);
      props.setCriminalCart((oldCart) => {
        const newCart = { ...oldCart };
        delete newCart[id];
        return { ...newCart };
      });
    },
    [props, removeOne],
  );

  const columns: ColumnsType<CrimeStoreTypes.CrimyInfo> = [
    {
      title: '罪犯名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '档卡号',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '年龄',
      key: 'crime_age',
      dataIndex: 'crime_age',
    },
    {
      title: '操作',
      key: 'action',
      render: (t, r) => <a onClick={() => handleDelCriminal(r.id)}>移除</a>,
    },
  ];

  // 批量删除
  const batchDelete = useCallback(() => {
    selectedRowKeys.forEach((key: React.Key) => {
      handleDelCriminal(key as string);
    });
  }, [handleDelCriminal, selectedRowKeys]);

  const handleOk = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (selectedRowKeys.length === 0) {
        message.warning('还未选择');
        return;
      }
      run(
        formatParams<React.Key[]>({
          nums: selectedRowKeys,
        }),
      ).then(() => {
        batchDelete();
        if (props.onOk) {
          props.onOk(e);
        }
      });
    },
    [batchDelete, props, run, selectedRowKeys],
  );

  return (
    <Modal
      title="发起批量评估"
      okText="发起评估"
      confirmLoading={loading}
      {...props}
      onOk={handleOk}
    >
      <div className={styles.row}>
        <span>已选罪犯 ({selectedRowKeys.length})</span>
        <Button onClick={batchDelete}>批量移除</Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        rowSelection={{ ...rowSelection, selectedRowKeys }}
      ></Table>
    </Modal>
  );
};

CartListModal.defaultProps = {
  mode: 'add',
  setCriminalCart: () => {},
};

export default CartListModal;
