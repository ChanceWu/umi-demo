import HighchartsMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts/highstock';
import HighchartsOldie from 'highcharts/modules/oldie';
import React, { useEffect, useRef } from 'react';
import styles from './index.less';

HighchartsMore(Highcharts);
HighchartsOldie(Highcharts);

// ['bc', 'font']
const colors = [
  ['#6F5EF9', '#6F5EF9'],
  ['#5C8FF9', '#5C8FF9'],
  ['#F7E4CA', '#BC8841'],
  ['#5AD8A6', '#33B782'],
  ['#945FB9', '#945FB9'],
  ['#C23E3E', '#C23E3E'],
  ['#5D7092', '#5D7092'],
];

interface IProps {
  data: { name: string; value: number }[];
}

const Labels: React.FunctionComponent<IProps> = (props) => {
  const domRef = useRef<HTMLDivElement>(null);
  const graph = useRef<Highcharts.Chart>();

  useEffect(() => {
    graph.current = Highcharts.chart({
      chart: {
        type: 'packedbubble',
        height: '235px',
        renderTo: domRef.current as HTMLElement,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      title: {
        text: '',
      },
      tooltip: {
        useHTML: true,
        formatter() {
          return `<b>${this.point.name}:</b>${this.y}`;
        },
      },
      plotOptions: {
        packedbubble: {
          minSize: '80%',
          maxSize: '120%',
          layoutAlgorithm: {
            gravitationalConstant: 0.02,
          },
        },
      },
      series: [
        {
          name: '性格特征',
          type: 'packedbubble',
          data: (props.data || []).map((item, index) => ({
            ...item,
            color: colors[index % 7][0],
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              style: {
                color: colors[index % 7][1],
                textOutline: 'none',
                fontWeight: 'normal',
                fontSize: 10 + (4 / 10) * item.value,
              },
            },
          })),
        },
      ],
    });
  }, [props.data]);

  return <div ref={domRef} style={{ height: 235 }} className={styles.relationWrap}></div>;
};

export default Labels;
