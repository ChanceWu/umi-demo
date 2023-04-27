import XgPlayerModal from '@/components/common/XgPlayer/XgPlayerModal';
import useMount from '@/hooks/useMount';
import usePagination from '@/hooks/usePagination';
import useRefData from '@/hooks/useRefData';
import { EvaluationApi } from '@/services';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import type { ModalProps } from 'antd';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type * as H from 'history';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'umi';

interface IProps extends ModalProps {
  propData?: CrimeEvaluationType.Clock[];
}

const MoreClockModal: React.FunctionComponent<IProps> = ({ propData, ...props }) => {
  const location: H.Location & { query?: { id: string } } = useLocation();
  const [dataSource, setDataSource] = useState<CrimeEvaluationType.Clock[]>([]);
  const { pagination, current, pageSize, setTotal } = usePagination();
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>('');

  const handleClickVideo = (src: string) => {
    setVideoSrc(src);
    setVideoVisible(true);
  };

  // table Columns
  const columns: ColumnsType<CrimeEvaluationType.Clock> = [
    {
      title: '打卡时间',
      key: 'create_date',
      dataIndex: 'create_date',
      width: 100,
    },
    {
      title: '算法结果分析',
      key: 'analy_result',
      dataIndex: 'analy_result',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 50,
      render: (r, d) => (
        <a onClick={() => handleClickVideo(d.video_path)}>
          播放
          <PlayCircleOutlined />
        </a>
      ),
    },
  ];

  const paramsDataRef = useRefData(() => ({
    pageSize,
    current,
  }));

  // 获取表格数据
  const { loading, run } = useRequest(
    () =>
      EvaluationApi.queryAssessClockInfo({
        pageSize_: paramsDataRef.current.pageSize,
        pageNum_: paramsDataRef.current.current,
        id: location.query?.id,
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
      run();
    }
  }, [props.visible, run]);

  useEffect(() => {
    if (isMount.current) {
      run();
    }
  }, [current, pageSize, isMount, run]);

  return (
    <Modal title="打卡信息" width={650} footer={null} {...props}>
      <Table
        rowKey="create_date"
        size="small"
        loading={loading}
        columns={columns}
        pagination={pagination}
        dataSource={dataSource.slice(0, pageSize)}
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

export default MoreClockModal;
