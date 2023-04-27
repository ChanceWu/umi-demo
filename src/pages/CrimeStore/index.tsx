import useFormData from '@/hooks/useFormData';
import useMount from '@/hooks/useMount';
import usePagination from '@/hooks/usePagination';
import useRefData from '@/hooks/useRefData';
import { DangerLevel } from '@/utils/common';
import { CrimeStoreApi } from '@/services';
import { formatParams } from '@/utils/utils';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Image, Input, message, Select } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { history, useModel } from 'umi';
import CartListModal from './components/CartListModal';
import GridTable from './components/GridTable';
import TypeSelect from './components/TypeSelect';
import useOrderType from './data/useOrderType';
import useStoreType from './data/useStoreType';
import styles from './index.less';
import imgAdd from '@/assets/images/crimeStore/add.png';
import imgAddSelected from '@/assets/images/crimeStore/add_selected.png';
import imgCollect from '@/assets/images/crimeStore/collect.png';
import imgCollectSelected from '@/assets/images/crimeStore/collect_selected.png';
import imgDangan from '@/assets/images/prisonarea/dangan.png';
import imgPinggu from '@/assets/images/prisonarea/pinggu.png';
import imgLiangbiao from '@/assets/images/prisonarea/liangbiao.png';
import { addAssessment, updateFollow } from '@/services/crimeStore';

const CrimeStore: React.FunctionComponent = () => {
  const { initialState } = useModel('@@initialState');
  const userCode = useRef('');
  const [criminalCart, setCriminalCart] = useState<Record<string, CrimeStoreTypes.CrimyInfo>>({});
  const [cartVisible, setCartVisible] = useState<boolean>(false);
  const { pagination, current, pageSize, setTotal, setCurrentPage } = usePagination({
    pageSize: 20,
  });
  const { form, resetForm, initialValues, params, onFormFinished } = useFormData();
  // 查询分类 全部、新入监、重点关注、主管对象
  const { curStoreType, setCurStoreType, storeTypeList } = useStoreType();
  const { orderTypeList, setCurOrderType, curOrderType } = useOrderType();
  // 表格数据
  const [dataSource, setDataSource] = useState<CrimeStoreTypes.CrimyInfo[]>([]);
  const paramsDataRef = useRefData(() => ({
    pageSize,
    current,
    curStoreType,
    params,
    curOrderType,
  }));

  // 获取表格数据
  const { loading, run } = useRequest(
    () =>
      CrimeStoreApi.queryCrimyInfo(
        formatParams({
          user_code: userCode.current,
          pageSize_: paramsDataRef.current.pageSize,
          pageNum_: paramsDataRef.current.current,
          status: paramsDataRef.current.curStoreType,
          order: paramsDataRef.current.curOrderType,
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
    userCode.current = (initialState?.currentUser as any).user_code || '';
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
  }, [curStoreType, curOrderType, params, setCurrentPage, isMount, paramsDataRef, run]);

  const handleCart = useCallback(
    (r: CrimeStoreTypes.CrimyInfo, type: 'add' | 'del' = 'add') => {
      if (type === 'add') {
        criminalCart[r.id] = r;
      } else {
        delete criminalCart[r.id];
      }
      setCriminalCart({ ...criminalCart });
    },
    [criminalCart],
  );

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
  const followReq = useRequest(updateFollow, {
    manual: true,
    onSuccess: (result) => {
      if (result?.resultList.length) {
        message.success('操作成功！');
        run();
      }
    },
  });
  // 新增/取消 重点关注
  const followHandle = (id: string, type: string = 'insert') => {
    followReq.run(formatParams({ type, user_code: userCode.current, bh: id }));
  };

  return (
    <div className={styles.wrap}>
      <TypeSelect list={storeTypeList} onSelect={setCurStoreType} defaultValue={curStoreType} />
      <div className={styles.container}>
        <Form
          form={form}
          layout="inline"
          style={{ display: 'block' }}
          initialValues={initialValues}
          onFinish={onFormFinished}
        >
          <div className={styles.selectWrap}>
            <Form.Item name="search_value">
              <Input
                className={styles.inputItem}
                placeholder="请输入档卡号或姓名进行搜索"
                autoComplete="off"
              />
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
              <Button
                type="primary"
                disabled={Object.keys(criminalCart).length === 0}
                onClick={() => setCartVisible(true)}
              >
                批量评估 ({Object.keys(criminalCart).length})
              </Button>
            </Form.Item>
            <Form.Item>
              <Select style={{ width: 150 }} value={curOrderType} onSelect={setCurOrderType}>
                {orderTypeList.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form>
        <GridTable
          rowKey="id"
          style={{ padding: '16px 10px' }}
          loading={loading}
          cardStyle={{ height: '180px' }}
          gridGap={20}
          gridItemMinWidth={260}
          dataSource={dataSource.slice(0, pageSize) /** slice为了防止antd报错 */}
          pagination={pagination}
          scroll={{ y: 'calc(100vh - 317px)' }}
        >
          {(r: CrimeStoreTypes.CrimyInfo) => (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span>{r.name}</span>
                <span style={{ marginLeft: 10 }}>{r.crime_age}</span>
                <div style={{ marginLeft: 'auto', marginRight: 12, cursor: 'pointer' }}>
                  {r.is_follow ? (
                    <img
                      src={imgCollectSelected}
                      title="取消关注"
                      onClick={() => followHandle(r.id, 'delete')}
                    />
                  ) : (
                    <img src={imgCollect} title="添加关注" onClick={() => followHandle(r.id)} />
                  )}
                </div>
                <div style={{ cursor: 'pointer' }}>
                  {criminalCart[r.id] ? (
                    <img
                      src={imgAddSelected}
                      onClick={() => handleCart(r, 'del')}
                      title="取消批量评估"
                    />
                  ) : (
                    <img src={imgAdd} onClick={() => handleCart(r)} title="添加批量评估" />
                  )}
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.contentLeft}>
                  <Image width={90} height={113} preview={false} src={r.photo} />
                  {r.crime_lg && r.crime_lg !== '无' && (
                    <span className={styles.tag}>{r.crime_lg}</span>
                  )}
                </div>
                <div className={styles.contentRight}>
                  <div className={styles.textRow}>
                    <span className={styles.label}>档卡号</span>
                    <span>{r.id}</span>
                  </div>
                  <div className={styles.textRow}>
                    <span className={styles.label}>互监组号</span>
                    <span>{r.hjz || '暂无'}</span>
                  </div>
                  <div className={styles.textRow}>
                    <span className={styles.label}>综合评估</span>
                    <span>{r.syn_eva || '暂无'}</span>
                  </div>
                  <div className={styles.textRow}>
                    <span className={styles.label}>危险性</span>
                    <span className={`${styles.button} ${DangerLevel[r.danger]}`}>
                      {r.danger}
                    </span>
                  </div>
                  <div className={styles.mark}>
                    <div
                      className={styles.icon}
                      onClick={() => handleClick(`/crimeOverview/crimeFile?id=${r.id}`)}
                    >
                      <img src={imgDangan} />
                      <span>档&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;案</span>
                    </div>
                    <div className={styles.icon} onClick={() => handleAssessment(r.id)}>
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
          )}
        </GridTable>
      </div>
      <CartListModal
        visible={cartVisible}
        criminalCart={criminalCart}
        setCriminalCart={setCriminalCart}
        onCancel={() => setCartVisible(false)}
        onOk={() => setCartVisible(false)}
      />
    </div>
  );
};

export default CrimeStore;
