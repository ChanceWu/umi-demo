import useFormData from '@/hooks/useFormData';
import useMount from '@/hooks/useMount';
import usePagination from '@/hooks/usePagination';
import useRefData from '@/hooks/useRefData';
import useTableSelect from '@/hooks/useTableSelect';
import { ConvergeApi } from '@/services';
import { downloadBlob, formatParams, sheet2blob } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { Button, Cascader, DatePicker, Form, Input, Select, Table } from 'antd';
import type { ColumnType } from 'antd/lib/table';
import type { SelectInfo } from 'rc-menu/lib/interface';
import React, { useEffect, useState } from 'react';
import XLSX from 'xlsx';
import useEnumData from '../../hooks/useEnumData';
import CustomMenu from './components/CustomMenu';
import { getColumn } from './data/columns';
import type { MenuItemInter } from './data/menus';
import menus, { formatAttrs, getMemuItemData, PartType } from './data/menus';
import styles from './index.less';

export type DataObj = Record<string, string | boolean | undefined>;

const Converge: React.FunctionComponent = () => {
  const [menuItem, setMenuItem] = useState<(MenuItemInter & { titlePath: string[] }) | undefined>(
    undefined,
  );
  const [tableData, setDataSource] = useState<DataObj[]>([]);
  const { mapEnumList, getMapEnumList } = useEnumData();
  const { pagination, current, pageSize, setTotal, setCurrentPage } = usePagination();
  const { rowSelection, selectedRowDatas, clearAll } = useTableSelect<DataObj>(current, {
    fixed: true,
  });
  const [columns, setColumns] = useState<ColumnType<any>[]>([]);
  const { form, params, resetForm, onFormFinished } = useFormData(undefined, {
    prison_area: (d: string) => ['四川省邑州监狱', d],
  });

  const paramsDataRef = useRefData(() => ({
    pageSize,
    current,
    menuItem,
    params,
  }));

  // 获取表格数据
  const { loading, run } = useRequest(
    (p: Record<string, string | number> = {}) => {
      return ConvergeApi.queryDataConfluence(
        formatParams({
          pageSize_: paramsDataRef.current.pageSize,
          pageNum_: paramsDataRef.current.current,
          module: paramsDataRef.current.menuItem!.titlePath.join('_'),
          ...paramsDataRef.current.params,
          ...p,
        }),
      );
    },
    {
      manual: true,
      onSuccess: (data) => {
        setTotal(data.size);
        if (data.resultList) {
          if (data.resultList[0]) {
            setColumns(
              Object.entries(data.resultList[0]).map(([key, value]) => {
                return getColumn(value as string)(key);
              }),
            );
          } else setColumns([]);
          // 数据中有的相关字段复制为id，防止报错
          const formatMapKeys: string[] = ['bh'];
          const resList = data.resultList.slice(1);
          resList.forEach((item) => {
            formatMapKeys.forEach((key) => {
              if (item[key] && !item.id) {
                Object.assign(item, {
                  id: item[key],
                });
              }
            });
          });
          setDataSource(resList);
        }
      },
    },
  );

  // 获取menu内部设定的配置数据
  const handleMenuChange = (item: Partial<SelectInfo>) => {
    const menu = getMemuItemData(item.keyPath ? [...item.keyPath] : [], menus);
    if (menu) {
      setMenuItem(menu);
      clearAll();
      setCurrentPage(1);
    }
  };

  // 左侧目录点击触发，刷新table
  useEffect(() => {
    if (menuItem) setTimeout(run, 0);
  }, [run, menuItem, current, resetForm]);

  // 左侧目录触发刷新遍历值
  useEffect(() => {
    if (menuItem) {
      resetForm();
      menuItem.searchParts?.forEach(async (item) => {
        if (item.dataKey) await getMapEnumList(item.dataKey);
      });
    }
  }, [getMapEnumList, menuItem, resetForm]);

  // sizechange出发
  useEffect(() => {
    if (paramsDataRef.current.current !== 1) setCurrentPage(1);
    else {
      run();
    }
  }, [pageSize, paramsDataRef, run, setCurrentPage]);

  // 搜索触发
  useEffect(() => {
    setCurrentPage(1);
    run({
      current: 1,
    });
  }, [params, run, setCurrentPage]);

  // 初始化menu
  useMount(() => {
    handleMenuChange({ keyPath: ['1-1', '1'] });
  });

  const handleButtonClick = (key: string) => {
    if (key === 'reset') {
      resetForm();
    }
    // 导出表格
    if (key === 'output') {
      const header = columns.reduce((p, n) => {
        const k = n.dataIndex as string;
        return { ...p, [k]: n.title };
      }, {});
      const sheet = XLSX.utils.json_to_sheet(
        selectedRowDatas.map((item) => {
          return Object.fromEntries(Object.entries(item).map((val) => [header[val[0]], val[1]]));
        }),
      );
      const name = paramsDataRef.current.menuItem!.titlePath.join('_');
      downloadBlob(sheet2blob(sheet, name), `${name}.xlsx`);
    }
  };

  return (
    <div className={styles.wrap}>
      <CustomMenu defaultOpenKeys={['1']} onSelect={handleMenuChange} />
      <div className={styles.content}>
        <Form form={form} layout="inline" onFinish={onFormFinished}>
          {menuItem &&
            menuItem.searchParts &&
            menuItem.searchParts.map((item) => (
              <React.Fragment key={item.key}>
                {item.partType === PartType.cascader && item.dataKey && (
                  <Form.Item name={item.name} style={item.formItemStyle}>
                    <Cascader
                      style={{ width: item.width || 200 }}
                      allowClear
                      options={
                        item.dataRender
                          ? item.dataRender(mapEnumList[item.dataKey])
                          : mapEnumList[item.dataKey]
                      }
                      {...formatAttrs(item.attrs)}
                    />
                  </Form.Item>
                )}
                {item.partType === PartType.datePicker && (
                  <Form.Item name={item.name} style={item.formItemStyle}>
                    <DatePicker style={{ width: item.width || 200 }} {...formatAttrs(item.attrs)} />
                  </Form.Item>
                )}
                {item.partType === PartType.select && item.dataKey && (
                  <Form.Item name={item.name} style={item.formItemStyle}>
                    <Select
                      allowClear
                      style={{ width: item.width || 100 }}
                      options={
                        item.dataRender
                          ? item.dataRender(mapEnumList[item.dataKey])
                          : mapEnumList[item.dataKey]
                      }
                      {...formatAttrs(item.attrs)}
                    />
                  </Form.Item>
                )}
                {item.partType === PartType.input && (
                  <Form.Item name={item.name} style={item.formItemStyle}>
                    <Input
                      style={{ width: item.width || 200 }}
                      {...formatAttrs(item.attrs)}
                      autoComplete="off"
                    />
                  </Form.Item>
                )}
                {item.partType === PartType.button && (
                  <Form.Item name={item.name} style={item.formItemStyle}>
                    <Button
                      {...formatAttrs(item.attrs, { selectedRowDatas })}
                      onClick={() => handleButtonClick(item.key)}
                    >
                      {item.children}
                    </Button>
                  </Form.Item>
                )}
              </React.Fragment>
            ))}
        </Form>

        <Table
          className={styles.table}
          rowKey="id"
          rowSelection={columns.length ? rowSelection : undefined}
          loading={loading}
          dataSource={tableData}
          columns={columns}
          style={{ marginTop: 20 }}
          scroll={{ x: 'max-content', y: 'calc(100vh - 300px)' }}
          pagination={pagination}
        />
      </div>
    </div>
  );
};

export default Converge;
