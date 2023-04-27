import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, DatePicker } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.less';

export interface TimeLineProps {
  initYearMonth?: string;
  initSelectedDay?: string;
  hasDays?: string[]; // ['2012-12-3']
  onChange?: (d: string) => void;
}

const TimeLine: React.FunctionComponent<TimeLineProps> = (props) => {
  const [yearMonth, setYearMonth] = useState<moment.Moment | null>(moment());
  const [selectedDay, setSelectedDay] = useState<moment.Moment | null>(null);
  const daysNum = useMemo(() => {
    return yearMonth?.daysInMonth() || 31;
  }, [yearMonth?.valueOf()]);

  useEffect(() => {
    if (props.initYearMonth) {
      setYearMonth(moment(props.initYearMonth));
    }
    if (props.initSelectedDay) {
      setSelectedDay(moment(props.initSelectedDay));
    }
  }, [props]);

  const stepMonth = (key: 'prev' | 'next') => {
    if (key === 'prev') {
      yearMonth?.month(yearMonth.month() - 1);
    } else {
      yearMonth?.month(yearMonth.month() + 1);
    }
    setYearMonth(yearMonth?.clone() || yearMonth);
  };

  const selectDay = (date: number) => {
    if (yearMonth) {
      const m = yearMonth.clone();
      m.date(date);
      console.log(m);
      setSelectedDay(m);
      if (props.onChange) {
        const date = m.format('YYYY-MM-DD');
        const realDate = props.hasDays?.find(d => d.includes(date));
        props.onChange(realDate || '');
      }
    }
  };

  const isHas = useCallback(
    (d?: moment.Moment) => {
      if (props.hasDays) {
        return !!props.hasDays.find((item) => item.includes(d?.format('YYYY-MM-DD') || '123456'));
      }
      return false;
    },
    [props.hasDays],
  );

  return (
    <div className={styles.timeLineWrap}>
      <div className={styles.header}>
        <DatePicker
          size="small"
          allowClear={false}
          value={yearMonth}
          onChange={setYearMonth}
          picker="month"
        />
        <Button size="small" onClick={() => stepMonth('prev')}>
          <LeftOutlined />
          上一月
        </Button>
        <Button size="small" onClick={() => stepMonth('next')}>
          <RightOutlined />
          下一月
        </Button>
      </div>
      <div className={styles.dayWrap}>
        {Array(daysNum)
          .fill(1)
          .map((d, i) => (
            <div
              className={` ${styles.day}
              ${isHas(yearMonth?.date(i + 1).clone()) ? styles.dayHas : styles.dayNoHas} ${
                yearMonth?.year() === selectedDay?.year() &&
                yearMonth?.month() === selectedDay?.month() &&
                selectedDay?.date() === i + 1
                  ? styles.daySelected
                  : styles.day
              }`}
              key={`${yearMonth?.valueOf() || 0}-${i}`}
              onClick={() => {
                isHas(yearMonth?.date(i + 1).clone()) ? selectDay(i + 1) : undefined;
              }}
            >
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimeLine;
