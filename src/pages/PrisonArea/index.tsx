import useDomOutIn from '@/hooks/useDomOutIn';
import useMenu2Content from '@/hooks/useMenu2Content';
import { queryPrisonArea, queryPrisonAreaBase } from '@/services/crimeStore';
import { formatParams } from '@/utils/utils';
import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Empty, Input, Spin, Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useModel } from 'umi';
import DangerList from './Components/DangerList';
import DataStatistics from './Components/DataStatistics';
import FloorBlock from './Components/FloorBlcok/ihdex';
import FloorMenu from './Components/FloorMenu';
import RoomBlock from './Components/RoomBlock';
import styles from './index.less';

type RoomData = Record<string, PrisonArea.Room[]>;
const initBase = {
  age_18_30: 0,
  age_31_45: 0,
  age_46_60: 0,
  age_61_80: 0,
  age_MIN_18: 0,
  age_max_80: 0,
  at_large_prison: 0,
  exec_out_prison: 0,
  in_Hospital: 0,
  in_custody: 0,
  in_registered: 0,
  visit_family_out_prison: 0,
};
const PrisonArea: React.FunctionComponent = () => {
  const { setScrollRef } = useMenu2Content();
  const { setScrollWrap } = useDomOutIn();
  const { prisonAreaList } = useModel('common.prisonData');
  const [roomData, setRoomData] = useState<RoomData>({});
  const [baseInfo, setBaseInfo] = useState<PrisonArea.Base>(initBase);
  const [searchValue, setSearchValue] = useState<string>('');
  const { run: queryFloor, loading: floorLoading } = useRequest(queryPrisonArea, {
    manual: true,
    onSuccess: (res) => {
      setRoomData({});
      if (res.resultList && res.resultList.length) {
        const map: RoomData = {};
        res.resultList.forEach((item) => {
          if (!map[item.floor]) map[item.floor] = [];
          map[item.floor].push(item);
        });
        setRoomData(map);
      }
    },
  });

  const { run: queryBase, loading: baseLoading } = useRequest(queryPrisonAreaBase, {
    manual: true,
    onSuccess: (res) => {
      setBaseInfo(initBase);
      if (res.resultList && res.resultList.length) {
        setBaseInfo(res.resultList[0]);
      }
    },
  });

  const [areaKey, setAreaKey] = useState<string>('');

  useEffect(() => {
    if (prisonAreaList[0] && !areaKey) {
      setAreaKey(prisonAreaList[0].value);
    }
  }, [areaKey, prisonAreaList]);

  useEffect(() => {
    if (areaKey) {
      setSearchValue('');
      queryFloor(
        formatParams({
          prison_area: areaKey,
        }),
      );
      queryBase(
        formatParams({
          prison_area: areaKey,
        }),
      );
    }
  }, [areaKey, queryBase, queryFloor]);

  const handleSearch = useCallback(() => {
    queryFloor(
      formatParams({
        prison_area: areaKey,
        search_value: searchValue,
      }),
    );
  }, [areaKey, queryFloor, searchValue]);

  return (
    <div className={styles.wrap}>
      <Tabs defaultActiveKey={areaKey} onChange={setAreaKey} tabBarGutter={10}>
        {prisonAreaList.map((item) => (
          <Tabs.TabPane tab={item.label} key={item.value}></Tabs.TabPane>
        ))}
      </Tabs>
      <DataStatistics baseInfo={baseInfo} baseLoading={baseLoading} />
      <div className={styles.container}>
        <div className={styles.row}>
          <Input.Search
            value={searchValue}
            style={{ width: 300 }}
            placeholder="输入姓名、档案号检索"
            onSearch={handleSearch}
            onChange={(e) => setSearchValue(e.target.value)}
            enterButton={
              <div>
                <SearchOutlined />
                查询
              </div>
            }
          />
          <DangerList />
        </div>
        <div className={styles.content}>
          {floorLoading && <Spin className={styles.blockLoading} spinning={floorLoading} />}
          {Object.entries(roomData).length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: '20%' }} />
          ) : (
            <>
              <FloorMenu />
              <div
                ref={(dom) => {
                  if (dom) {
                    setScrollRef(dom);
                    setScrollWrap(dom);
                  }
                }}
                className={styles.roomScrollWrap}
              >
                {Object.entries(roomData).map((item, index) => (
                  <FloorBlock title={`${item[0]}楼`} key={item[0] + String(index)}>
                    <div className={styles.roomList}>
                      {item[1].map((d, i) => (
                        <RoomBlock
                          key={String(i)}
                          jsh={d.jsh}
                          count={d.count}
                          prison_area={areaKey}
                          searchValue={searchValue}
                        />
                      ))}
                    </div>
                  </FloorBlock>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrisonArea;
