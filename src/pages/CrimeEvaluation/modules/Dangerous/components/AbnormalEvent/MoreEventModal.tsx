import XgPlayerModal from '@/components/common/XgPlayer/XgPlayerModal';
import useFormData from '@/hooks/useFormData';
import useMount from '@/hooks/useMount';
import usePagination from '@/hooks/usePagination';
import useRefData from '@/hooks/useRefData';
import { EvaluationApi } from '@/services';
import { useRequest } from 'ahooks';
import type { ModalProps } from 'antd';
import { DatePicker, Form, Modal, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type * as H from 'history';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'umi';
import styles from './index.less';

interface IProps extends ModalProps {
  propData?: CrimeEvaluationType.Abnormal[];
}

const MoreEventModal: React.FunctionComponent<IProps> = ({ propData, ...props }) => {
  const location: H.Location & { query?: { id: string } } = useLocation();
  const { form, resetForm, initialValues, params, onFormFinished } = useFormData();
  const [dataSource, setDataSource] = useState<CrimeEvaluationType.Abnormal[]>([]);
  const { pagination, current, pageSize, setTotal, setCurrentPage } = usePagination();
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>('');

  const handleClickVideo = (src: string) => {
    setVideoSrc(src);
    setVideoVisible(true);
  };

  // table Columns
  const columns: ColumnsType<CrimeEvaluationType.Abnormal> = [
    {
      title: '开始时间',
      dataIndex: 'start_date',
      key: 'start_date',
      width: 150,
    },
    {
      title: '结束时间',
      dataIndex: 'end_date',
      key: 'end_date',
      width: 150,
    },
    {
      title: '意识状态识别',
      dataIndex: 'conscious_state',
      key: 'conscious_state',
      width: 100,
      render: (conscious_state: string) => {
        return (
          <span
            className={styles.colorLabel}
            style={{ background: conscious_state === '觉醒' ? '#40A3A1' : '#5C5F93' }}
          >
            {conscious_state}
          </span>
        );
      },
    },
    {
      title: '表情识别',
      dataIndex: 'expression_discern',
      key: 'expression_discern',
      width: 70,
      render: (expression_discern: string) => {
        return (
          <span
            className={styles.colorLabel}
            style={{ background: expression_discern === '积极' ? '#40A3A1' : '#6C010E' }}
          >
            {expression_discern}
          </span>
        );
      },
    },
    {
      title: '活动区域及动作检测',
      dataIndex: 'activity_area',
      key: 'activity_area',
      width: 150,
      render: (activity_area: string) => {
        let color = '#6395F9';
        if (activity_area === '一级界限') color = '#607EBD';
        if (activity_area === '二级界限') color = '#D88F22';
        return (
          <span className={styles.colorLabel} style={{ background: color }}>
            {activity_area}
          </span>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (r, d) => <a onClick={() => handleClickVideo(d.video_path)}>查看详情</a>,
    },
  ];

  const paramsDataRef = useRefData(() => ({
    pageSize,
    current,
    params,
  }));

  const curParams = useMemo(() => {
    const { date, ...p } = params;
    const cp: {
      id?: string;
      start_date?: string;
      end_date?: string;
      conscious_state?: string;
      expression_discern?: string;
      activity_area?: string;
      pageSize_?: number;
      pageNum_?: number;
    } = {
      ...p,
    };
    if (date instanceof Array && date.length === 2) {
      cp.start_date = date[0].format('YYYY-MM-DD');
      cp.end_date = date[1].format('YYYY-MM-DD');
    }
    return cp;
  }, [params]);

  // 获取表格数据
  const { loading, run } = useRequest(
    () =>
      EvaluationApi.queryAssessAbnormalInfo({
        pageSize_: paramsDataRef.current.pageSize,
        pageNum_: paramsDataRef.current.current,
        id: location.query?.id,
        ...curParams,
      }),
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
    <Modal title="异常事件" width={880} footer={null} {...props}>
      <Form
        form={form}
        layout="inline"
        style={{ display: 'block' }}
        initialValues={initialValues}
        onFinish={onFormFinished}
      >
        <div className={styles.selectWrap}>
          <Form.Item name="date">
            <DatePicker.RangePicker
              placeholder={['开始时间范围', '开始时间范围']}
              onChange={() => form.submit()}
            />
          </Form.Item>
          <Form.Item name="conscious_state">
            <Select placeholder="意识状态" allowClear onChange={() => form.submit()}>
              <Select.Option value="觉醒">觉醒</Select.Option>
              <Select.Option value="疲倦">疲倦</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="expression_discern">
            <Select placeholder="表情识别" allowClear onChange={() => form.submit()}>
              <Select.Option value="积极">积极</Select.Option>
              <Select.Option value="消极">消极</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="activity_area">
            <Select placeholder="活动区域及动作检测" allowClear onChange={() => form.submit()}>
              <Select.Option value="正常">正常</Select.Option>
              <Select.Option value="一级界限">一级界限</Select.Option>
              <Select.Option value="二级界限">二级界限</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
      <Table
        rowKey="id"
        size="small"
        columns={columns}
        loading={loading}
        dataSource={dataSource.slice(0, pageSize) /** slice为了防止antd报错 */}
        pagination={pagination}
        scroll={{ x: 'max-content', y: 'calc(100vh - 325px)' }}
      />
      <XgPlayerModal
        src={videoSrc}
        visible={videoVisible}
        onCancel={() => setVideoVisible(false)}
      />
    </Modal>
  );
};

export default MoreEventModal;
