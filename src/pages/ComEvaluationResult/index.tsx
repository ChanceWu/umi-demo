import useFormData from '@/hooks/useFormData';
import useMount from '@/hooks/useMount';
import usePagination from '@/hooks/usePagination';
import useRefData from '@/hooks/useRefData';
import { EvaluationApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Input, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import EvalHistoryModal from './components/EvalHistoryModal';
import styles from './index.less';

const ComEvaluationResult: React.FunctionComponent = () => {
  const [historyVisible, setHistoryVisible] = useState(false);
  const [historyPropData, setHistoryPropData] = useState<EvaluationTypes.EvaluationResult>();
  const { pagination, current, pageSize, setTotal, setCurrentPage } = usePagination();
  const { form, resetForm, initialValues, params, onFormFinished } = useFormData();
  // 监狱列表
  const { prisonAreaList } = useModel('common.prisonData');
  // 表格数据
  const [dataSource, setDataSource] = useState<EvaluationTypes.EvaluationResult[]>([]);
  // table Columns
  const columns: ColumnsType<EvaluationTypes.EvaluationResult> = [
    {
      title: '罪犯姓名',
      key: 'name',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '档卡号',
      key: 'id',
      dataIndex: 'id',
      width: 150,
    },
    {
      title: '所属监区',
      key: 'prison',
      dataIndex: 'prison',
      width: 150,
    },
    {
      title: '监舍',
      key: 'jsh',
      dataIndex: 'jsh',
      width: 150,
    },
    {
      title: '评估发起人',
      key: 'create_user',
      dataIndex: 'create_user',
      width: 150,
    },
    {
      title: '最后一次评估发起时间',
      dataIndex: 'assess_date',
      key: 'assess_date',
      width: 250,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (i, d) => (
        <a
          onClick={() => {
            setHistoryPropData(d);
            setHistoryVisible(true);
          }}
        >
          历史评估详情
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
      EvaluationApi.queryAssessResultCom(
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
      },
    },
  );

  const isMount = useMount(() => {
    run();
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
          <Form.Item name="prison_area">
            <Select style={{ width: 150 }} placeholder="所属监区" allowClear>
              {prisonAreaList.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="search_value">
            <Input className={styles.inputItem} placeholder="请输入档卡号或姓名进行搜索" />
          </Form.Item>
          <Form.Item>
            <Button onClick={resetForm}>
              <UndoOutlined />
              重置
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
              查询
            </Button>
          </Form.Item>
          {/* <Form.Item style={{ marginLeft: 'auto' }}>
            <Button>
              批量导出
            </Button>
          </Form.Item> */}
        </div>
      </Form>
      <Table
        rowKey="primartId"
        columns={columns}
        loading={loading}
        dataSource={dataSource.slice(0, pageSize) /** slice为了防止antd报错 */}
        pagination={pagination}
        scroll={{ x: 'max-content', y: 'calc(100vh - 325px)' }}
      />
      <EvalHistoryModal
        visible={historyVisible}
        propData={historyPropData}
        onCancel={() => setHistoryVisible(false)}
      />
    </div>
  );
};

export default ComEvaluationResult;
