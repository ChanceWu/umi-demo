import useDomOutIn from '@/hooks/useDomOutIn';
import useRefData from '@/hooks/useRefData';
import { addAssessment, queryPrisonAreaDetail } from '@/services/crimeStore';
import { formatParams } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { Image, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'umi';
import styles from './index.less';
import { HomeOutlined } from '@ant-design/icons';
import imgJianshe from '@/assets/images/prisonarea/jianshe.png';
import imgBed from '@/assets/images/prisonarea/bed.png';
import imgDangan from '@/assets/images/prisonarea/dangan.png';
import imgPinggu from '@/assets/images/prisonarea/pinggu.png';
import imgLiangbiao from '@/assets/images/prisonarea/liangbiao.png';
import { DangerLevel } from '@/utils/common';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number; // 人数
  jsh: string; // 监舍
  prison_area: string; // 监区
  searchValue: string; // 搜索条件
}

const RoomBlock: React.FunctionComponent<IProps> = ({
  count,
  jsh,
  prison_area,
  searchValue = '',
  ...props
}) => {
  const history = useHistory();
  const [criminalList, setCriminalList] = useState<PrisonArea.Person[]>([]);
  const { status, ref } = useDomOutIn();
  const { loading, run: queryRoomCriminal } = useRequest(queryPrisonAreaDetail, {
    manual: true,
    onSuccess: (res) => {
      if (res.resultList && res.resultList.length) {
        setCriminalList(res.resultList);
      }
    },
  });

  const refData = useRefData(() => ({
    criminalList,
    jsh,
    prison_area,
  }));

  useEffect(() => {
    setCriminalList([]);
  }, [jsh, prison_area]);

  useEffect(() => {
    if (status && refData.current.criminalList.length === 0) {
      queryRoomCriminal(
        formatParams({
          prison_area: refData.current.prison_area,
          jsh: refData.current.jsh,
          search_value: searchValue,
        }),
      );
    }
  }, [queryRoomCriminal, refData, status, jsh, prison_area, searchValue]);

  const handleClick = (url: string) => {
    history.push(url);
  };
  const AddAssessmentReq = useRequest(addAssessment, {
    manual: true,
  });
  const handleAssessment = (id: string) => {
    AddAssessmentReq.run(formatParams({ nums: [id] })).then((res) => {
      if (res.resultList[0].code === '200') {
        message.success(res.resultList[0].msg);
      }
    });
  };

  return (
    <div ref={ref} className={styles.roomBlock} {...props}>
      <div className={styles.header}>
        <img src={imgJianshe} alt="buttonbg" />
        <span>
          <HomeOutlined />
          &nbsp;{`${jsh}监舍（${count}人）`}
        </span>
      </div>
      <Spin spinning={loading}>
        <div className={styles.content}>
          <div className={styles.grid}>
            {criminalList.map((item, index) => (
              <div key={String(index)} className={styles.bed}>
                <div className={styles.bed_number}>
                  <img src={imgBed} />
                  <span>{item.cwh}床</span>
                </div>
                <div className={styles.person_info}>
                  <Image width={60} height={70} src={item.photo} preview={false}/>
                  <div className={styles.person_content}>
                    <div className={styles.content_row}>
                      <div className={styles.title}>{item.name}</div>
                      <div>
                        <span className={`${styles.button} ${DangerLevel[item.danger_level]}`}>
                          {item.danger_level}
                        </span>
                      </div>
                    </div>
                    <div className={styles.content_row}>
                      <span>
                        <span className={styles.label}>档卡号：</span>
                        {item.id}
                      </span>
                      <span>
                        <span className={styles.label}>互监组号：</span>
                        {item.hjz}
                      </span>
                    </div>
                    <div className={styles.mark}>
                      <div
                        className={styles.icon}
                        onClick={() => handleClick(`/crimeOverview/crimeFile?id=${item.id}`)}
                      >
                        <img src={imgDangan} />
                        <span>档案</span>
                      </div>
                      <div
                        className={styles.icon}
                        onClick={() => handleAssessment(item.id)}
                      >
                        <img src={imgPinggu} />
                        <span>发起评估</span>
                      </div>
                      <div className={styles.icon}>
                        <img src={imgLiangbiao} />
                        <span>发起量表</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default RoomBlock;
