import { Empty, Pagination, PaginationProps, Spin } from 'antd';
import type { DefaultRecordType } from 'rc-table/lib/interface';
import type { TableProps } from 'rc-table/lib/Table';
import React from 'react';
import styles from './index.less';

interface IProps<RecordType extends DefaultRecordType> extends TableProps<RecordType> {
  loading?: boolean;
  dataSource?: RecordType[];
  gridGap?: number;
  gridItemMinWidth?: number;
  pagination?: PaginationProps;
  cardStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children?: (r: RecordType) => React.ReactNode;
}

const GridTable: React.FunctionComponent<IProps<any>> = (props) => {
  return (
    <Spin spinning={props.loading}>
      <div className={styles.gridTableWrap} style={{ ...(props.style || {}) }}>
        <div className={styles.scrollContent} style={{ height: props.scroll?.y }}>
          {props.dataSource && props.dataSource.length ? (
            <div
              className={styles.gridContent}
              style={{
                gridGap: `${props.gridGap}px`,
                gridTemplateColumns: `repeat(auto-fill, minmax(${
                  props.gridItemMinWidth || 250
                }px, 1fr))`,
              }}
            >
              {props.dataSource?.map((item, index) => (
                <div
                  className={styles.gridItem}
                  style={{ ...(props.cardStyle || {}) }}
                  key={String(index)}
                >
                  {props.children && props.children(item)}
                </div>
              ))}
            </div>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{marginTop: '10%'}} />
          )}
        </div>
        <div className={styles.gridTableFooter}>
          <Pagination {...(props.pagination || {})} />
        </div>
      </div>
    </Spin>
  );
};

export default GridTable;
