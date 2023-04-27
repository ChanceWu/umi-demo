import useFormData from '@/hooks/useFormData';
import useMount from '@/hooks/useMount';
import usePagination from '@/hooks/usePagination';
import useRefData from '@/hooks/useRefData';
import type { CrimeEvaluationProps } from '@/pages/CrimeEvaluation';
import CrimeEvaluationModal from '@/pages/CrimeEvaluation/components/CrimeEvaluationModal';
import { EvaluationApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import type { ModalProps } from 'antd';
import { Button, Form, Modal, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

interface IProps extends ModalProps {
  propData?: EvaluationTypes.EvaluationResult;
}

const EvalHistoryModal: React.FunctionComponent<IProps> = ({ propData, ...props }) => {
  const [evalVisible, setEvalVisible] = useState(false);
  const [evalData, setEvalData] = useState<CrimeEvaluationProps>({ id: '' });
  const { form, resetForm, initialValues, params, onFormFinished } = useFormData();
  // 表格数据
  const [dataSource, setDataSource] = useState<EvaluationTypes.EvaluationResultHistory[]>([]);
  const { pagination, current, pageSize, setTotal, setCurrentPage } = usePagination();
  // table Columns
  const columns: ColumnsType<EvaluationTypes.EvaluationResultHistory> = [
    {
      title: '序号',
      key: 'sort',
      dataIndex: 'sort',
      width: 50,
    },
    {
      title: '发起时间',
      key: 'assess_date',
      dataIndex: 'assess_date',
      width: 150,
    },
    {
      title: '评估发起人',
      key: 'create_user',
      dataIndex: 'create_user',
      width: 150,
    },
    {
      title: '执行结果',
      key: 'exe_result',
      dataIndex: 'exe_result',
      width: 100,
      render: (d) =>
        d === 'success' ? (
          <span style={{ color: 'green' }}>成功</span>
        ) : (
          <span style={{ color: 'red' }}>失败</span>
        ),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (r, d) => (
        <a
          onClick={() => {
            if (d.exe_result === 'success') {
              setEvalData({
                id: d.id,
                assess_date: d.assess_date,
              });
              setEvalVisible(true);
            }
          }}
          style={
            d.exe_result === 'success'
              ? {}
              : {
                  color: 'grey',
                  cursor: 'not-allowed',
                }
          }
        >
          查看详情
        </a>
      ),
    },
  ];

  const paramsDataRef = useRefData(() => ({
    pageSize,
    current,
    params,
  }));

  // 获取表格数据
  const { loading, run } = useRequest(
    () =>
      EvaluationApi.queryAssessResultComHis(
        formatParams({
          pageSize_: paramsDataRef.current.pageSize,
          pageNum_: paramsDataRef.current.current,
          id: propData?.id,
          ...paramsDataRef.current.params,
        }),
      ),
    {
      manual: true,
      onSuccess: (data) => {
        setTotal(data.size);
        setDataSource(data.resultList);
      },
    },
  );

  const isMount = useMount(() => {});

  useEffect(() => {
    if (props.visible) {
      resetForm();
    }
  }, [props.visible, resetForm]);

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

  return (
    <Modal title="罪犯历史评估列表" width={850} footer={null} {...props}>
      <Form
        form={form}
        layout="inline"
        style={{ display: 'block' }}
        initialValues={initialValues}
        onFinish={onFormFinished}
      >
        <div className={styles.selectWrap}>
          <Form.Item name="exe_result">
            <Select placeholder="执行结果" allowClear>
              <Select.Option value="success">成功</Select.Option>
              <Select.Option value="fail">失败</Select.Option>
            </Select>
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
            <span>合计7次</span>
          </Form.Item>
        </div>
      </Form>
      <Table
        rowKey="sort"
        size="small"
        loading={loading}
        columns={columns}
        dataSource={dataSource.slice(0, pageSize) /** slice为了防止antd报错 */}
        pagination={pagination}
        scroll={{ x: 'max-content', y: 'calc(100vh - 325px)' }}
      />
      <CrimeEvaluationModal
        visible={evalVisible}
        {...evalData}
        onCancel={() => setEvalVisible(false)}
      />
    </Modal>
  );
};

export default EvalHistoryModal;
