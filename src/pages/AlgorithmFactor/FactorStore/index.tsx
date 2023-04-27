import useFormData from '@/hooks/useFormData';
import useMount from '@/hooks/useMount';
import usePagination from '@/hooks/usePagination';
import useRefData from '@/hooks/useRefData';
import { AlgorithmFactorApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { DeleteOutlined, EditOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Select, Form, Input, Table, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import type { Location } from 'umi';
import { evaluationTypes } from '../AlgorithmManage';
import FactorModal from './components/FactorModal';
import styles from './index.less';

interface IProps {
  location: Location;
}
export const initItem: AlgorithmFactorType.AlgorithmInfoField = {
  algorith_name: '',
  algorithm_id: '',
  code: '',
  desc: '',
  id: 1,
  name: '',
  source_database: '',
  source_field: '',
  source_table: '',
  type: '',
  weight: 0,
};
const FactorStore: React.FunctionComponent<IProps> = ({ location }) => {
  const [algorithmNameList, setAlgorithmNameList] = useState<AlgorithmFactorType.AlgorithmInfo[]>(
    [],
  );
  const { pagination, current, pageSize, setTotal, setCurrentPage } = usePagination();
  const { form, resetForm, initialValues, params, onFormFinished } = useFormData(
    {
      key: 'criminalName',
    },
    {
      preson_area: (v: (string | number)[]) => v.join('_'),
    },
  );
  // 表格数据
  const [dataSource, setDataSource] = useState<AlgorithmFactorType.AlgorithmInfoField[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [curItem, setCurItem] = useState<AlgorithmFactorType.AlgorithmInfoField>(initItem);
  const paramsDataRef = useRefData(() => ({
    pageSize,
    current,
    params,
  }));

  // 获取表格数据
  const { loading, run } = useRequest(
    () =>
      AlgorithmFactorApi.queryAlgorithmInfoField(
        formatParams({
          pageSize_: paramsDataRef.current.pageSize,
          pageNum_: paramsDataRef.current.current,
          ...paramsDataRef.current.params,
        }),
      ),
    {
      manual: true,
      onSuccess: (data) => {
        setTotal(data.size);
        setDataSource(data.resultList);
        setSelectedRowKeys([]);
      },
    },
  );
  const delFactorReq = useRequest(AlgorithmFactorApi.deleteAlgorithmInfoField, {
    manual: true,
    onSuccess: (result) => {
      if (result.resultList?.length) {
        message.success('删除成功');
        run();
      }
    },
  });
  const showModal = (record: AlgorithmFactorType.AlgorithmInfoField) => {
    setVisible(true);
    setCurItem({ ...record });
  };
  const onCancel = () => {
    setVisible(false);
  };
  const updateFactor = () => {
    run();
    onCancel();
  };
  const delFactor = (record: AlgorithmFactorType.AlgorithmInfoField) => {
    Modal.confirm({
      content: `是否确定删除因子编号为【${record.code}】的数据？`,
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: () => delFactorReq.run(formatParams({ ids: [record.id] })),
    });
  };
  const batchDelFactor = () => {
    Modal.confirm({
      content: `是否确定批量删除选中的${selectedRowKeys.length}条数据？`,
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk: () => delFactorReq.run(formatParams({ ids: selectedRowKeys })),
    });
  };
  // table Columns
  const columns: ColumnsType<AlgorithmFactorType.AlgorithmInfoField> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: '评估类型',
      key: 'type',
      dataIndex: 'type',
      width: 150,
    },
    {
      title: '算法名称',
      key: 'algorith_name',
      dataIndex: 'algorith_name',
      width: 200,
    },
    {
      title: '因子编号',
      key: 'code',
      dataIndex: 'code',
      width: 150,
    },
    {
      title: '评估因子',
      key: 'name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '权重',
      key: 'weight',
      dataIndex: 'weight',
      width: 150,
    },
    {
      title: '朔源表',
      key: 'source_table',
      dataIndex: 'source_table',
      width: 150,
    },
    {
      title: '朔源字段',
      key: 'source_field',
      dataIndex: 'source_field',
      width: 150,
    },
    {
      title: '描述',
      key: 'desc',
      dataIndex: 'desc',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 80,
      render: (text, record) => (
        <div className={styles.toolbar}>
          <span onClick={() => delFactor(record)}>
            <DeleteOutlined title="删除" />
          </span>
          <span style={{ marginLeft: 20 }} onClick={() => showModal(record)}>
            <EditOutlined title="编辑" />
          </span>
        </div>
      ),
    },
  ];

  // 获取评估类型 对应 算法名称
  const getAlgorithmInfoReq = useRequest(AlgorithmFactorApi.queryAlgorithmInfo, {
    manual: true,
    onSuccess: (data) => {
      setAlgorithmNameList(data.resultList);
    },
  });

  const isMount = useMount(() => {
    const oldValues = form.getFieldsValue();
    const { type, name: algorith_name } = location.query as any;
    form.setFieldsValue({ ...oldValues, type, algorith_name });
    if (type) {
      getAlgorithmInfoReq.run(formatParams({ type }));
      const values = form.getFieldsValue();
      onFormFinished(values);
    } else {
      run();
    }
  });

  useEffect(() => {
    if (isMount.current) {
      run();
    }
  }, [current, pageSize, isMount, run]);

  useEffect(() => {
    if (isMount.current) {
      if (paramsDataRef.current.current === 1) {
        run();
        return;
      }
      setCurrentPage(1);
    }
  }, [params, setCurrentPage, isMount, paramsDataRef, run]);
  const selectAlgorithmName = (value: string) => {
    const values = form.getFieldsValue();
    form.setFieldsValue({ ...values, algorith_name: undefined });
    getAlgorithmInfoReq.run(formatParams({ type: value }));
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (_selectedRowKeys: any) => {
      setSelectedRowKeys(_selectedRowKeys);
    },
  };
  return (
    <div className={styles.wrap}>
      <Form
        form={form}
        layout="inline"
        style={{ display: 'block' }}
        initialValues={initialValues}
        onFinish={onFormFinished}
      >
        <div className={styles.selectWrap}>
          <Form.Item name="type">
            <Select
              style={{ width: 150 }}
              placeholder="评估类型"
              onSelect={selectAlgorithmName}
              allowClear
            >
              {evaluationTypes.map((item) => (
                <Select.Option value={item.key} key={item.key}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="algorith_name">
            <Select style={{ width: 150 }} placeholder="算法名称" allowClear>
              {algorithmNameList.map((item) => (
                <Select.Option value={item.name} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="search_value">
            <Input className={styles.inputItem} placeholder="请输入因子名称" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={resetForm}>
              <UndoOutlined />
              重置
            </Button>
          </Form.Item>
          <Form.Item style={{ marginLeft: 'auto' }}>
            <Button onClick={batchDelFactor} disabled={selectedRowKeys.length === 0}>
              批量删除({selectedRowKeys.length})
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        loading={loading}
        dataSource={dataSource.slice(0, pageSize) /** slice为了防止antd报错 */}
        pagination={pagination}
        scroll={{ x: 'max-content', y: 'calc(100vh - 291px)' }}
        className={styles.factor_table}
      />
      <FactorModal visible={visible} item={curItem} onOk={updateFactor} onCancel={onCancel} />
    </div>
  );
};

export default FactorStore;
