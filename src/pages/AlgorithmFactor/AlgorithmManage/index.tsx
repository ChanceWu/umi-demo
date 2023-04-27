import GridTable from '@/components/common/GridTable';
import useFormData from '@/hooks/useFormData';
import useMount from '@/hooks/useMount';
import usePagination from '@/hooks/usePagination';
import useRefData from '@/hooks/useRefData';
import { AlgorithmFactorApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Input, Tabs } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import type { History } from 'umi';
import AlgorithmInfoModal from './component/AlgorithmInfoModal';
import InfoCard from './component/InfoCard';
import styles from './index.less';

export type Item = AlgorithmFactorType.AlgorithmInfo;
interface IProps {
  history: History;
}
export const evaluationTypes = [
  {
    title: '再犯罪评估',
    key: '再犯罪评估',
  },
  {
    title: '个体危险性评估',
    key: '个体危险性评估',
  },
  {
    title: '身心健康评估',
    key: '身心健康评估',
  },
  {
    title: '职业技术能力评估',
    key: '职业技术能力评估',
  },
  {
    title: '社会适应性评估',
    key: '社会适应性评估',
  },
  {
    title: '认罪悔罪评估',
    key: '认罪悔罪评估',
  },
  {
    title: '改造难易度评估',
    key: '改造难易度评估',
  },
];
const initItem = {
  create_date: '',
  create_user: '',
  desc: '',
  id: '',
  name: '',
  type: '',
  update_date: '',
  version: '',
  files: '[]',
};

const AlgorithmManage: React.FunctionComponent<IProps> = ({ history }) => {
  const [type, setType] = useState<string>('再犯罪评估');
  const { pagination, current, pageSize, setTotal, setCurrentPage } = usePagination();
  const { form, resetForm, initialValues, params, onFormFinished } = useFormData(
    {
      key: 'criminalName',
    },
    {
      preson_area: (v: (string | number)[]) => v.join('_'),
    },
  );
  /** *******************        模态框  start      **************** */
  const [visible, setVisible] = useState(false);
  const [curInfo, setCurInfo] = useState<Item>(initItem);
  /** *******************        模态框  end      **************** */
  // 表格数据
  const [dataSource, setDataSource] = useState<AlgorithmFactorType.AlgorithmInfo[]>([]);
  // table Columns
  const columns: ColumnsType<AlgorithmFactorType.AlgorithmInfo> = [
    {
      title: '评估发起时间',
      dataIndex: 'id',
      key: 'date',
      width: 150,
    },
    {
      title: '罪犯姓名',
      key: 'crime_name',
      dataIndex: 'crime_name',
      width: 150,
    },
    {
      title: '罪犯档卡号',
      key: 'sen_type',
      dataIndex: 'sen_type',
      width: 150,
    },
    {
      title: '所属监区',
      key: 'crime_lg',
      dataIndex: 'crime_lg',
      width: 150,
    },
    {
      title: '所属监舍',
      key: 'det_unit',
      dataIndex: 'det_unit',
      width: 150,
    },
    {
      title: '主管民警',
      key: 'preson_area',
      dataIndex: 'preson_area',
      width: 150,
    },
    {
      title: '评估发起人',
      key: 'crime_team',
      dataIndex: 'crime_team',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: () => <a>历史评估详情</a>,
    },
  ];

  const paramsDataRef = useRefData(() => ({
    pageSize,
    current,
    params,
    type,
  }));

  // 获取表格数据
  const { loading, run } = useRequest(
    () =>
      AlgorithmFactorApi.queryAlgorithmInfo(
        formatParams({
          pageSize_: paramsDataRef.current.pageSize,
          pageNum_: paramsDataRef.current.current,
          type: paramsDataRef.current.type,
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
  }, [params, type, setCurrentPage, isMount, paramsDataRef, run]);

  const onCancel = () => {
    setVisible(false);
  };
  const onOk = () => {
    run();
    onCancel();
  };
  const showModal = (item: Item) => {
    setCurInfo({ ...item });
    setVisible(true);
  };
  const showFactor = (name: string) => {
    history.push({ pathname: '/algorithmFactor/factor', query: { name, type } });
  };

  return (
    <div className={styles.wrap}>
      <Tabs activeKey={type} onChange={setType}>
        {evaluationTypes.map((item) => (
          <Tabs.TabPane tab={item.title} key={item.key}></Tabs.TabPane>
        ))}
      </Tabs>
      <Form
        form={form}
        layout="inline"
        style={{ display: 'block' }}
        initialValues={initialValues}
        onFinish={onFormFinished}
      >
        <div className={styles.selectWrap}>
          <Form.Item name="search_value">
            <Input className={styles.inputItem} placeholder="请输入算法名称" />
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
        </div>
      </Form>
      <GridTable
        rowKey="id"
        columns={columns}
        gridGap={20}
        gridItemMinWidth={300}
        loading={loading}
        dataSource={dataSource.slice(0, pageSize) /** slice为了防止antd报错 */}
        pagination={pagination}
        scroll={{ x: 'max-content', y: 'calc(100vh - 289px)' }}
        style={{ padding: '0 20px' }}
      >
        {(item: Item) => <InfoCard item={item} showModal={showModal} showFactor={showFactor} />}
      </GridTable>
      <AlgorithmInfoModal visible={visible} onOk={onOk} onCancel={onCancel} item={curInfo} />
    </div>
  );
};

export default AlgorithmManage;
