import XgPlayerModal from '@/components/common/XgPlayer/XgPlayerModal';
import ModuleName from '@/pages/CrimeEvaluation/components/ModuleName';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import MoreEventModal from './MoreEventModal';

const AbnormalEvent: React.FunctionComponent = () => {
  const { riskInfo } = useModel('crimeStore.evaluation');
  const [moreVisible, setMoreVisible] = useState<boolean>(false);
  const [videoVisible, setVideoVisible] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>('');

  const handleClickVideo = (src: string) => {
    setVideoSrc(src);
    setVideoVisible(true);
  }

  const columns: ColumnsType<CrimeEvaluationType.Abnormal> = [
    {
      title: '开始时间',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: '结束时间',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: '意识状态识别',
      dataIndex: 'conscious_state',
      key: 'conscious_state',
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
      render: (r, d) => <a onClick={() => handleClickVideo(d.video_path)}>查看详情</a>,
    },
  ];
  return (
    <>
      <ModuleName rightContent={<a onClick={() => setMoreVisible(true)}>{'更多>>'}</a>}>
        异常事件
      </ModuleName>
      <div className={styles.changeTableWrap}>
        <Table
          rowKey="id"
          dataSource={riskInfo?.abnormal.slice(0, 5) || []}
          columns={columns}
          size="small"
          pagination={false}
          scroll={{ y: '20vw' }}
          bordered
        />
      </div>
      <MoreEventModal
        visible={moreVisible}
        propData={riskInfo?.abnormal}
        onCancel={() => setMoreVisible(false)}
      />
      <XgPlayerModal src={videoSrc} visible={videoVisible} onCancel={() => setVideoVisible(false)}/>
    </>
  );
};

export default AbnormalEvent;
