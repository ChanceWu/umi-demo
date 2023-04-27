import useResize from '@/hooks/useResize';
import type { Graph, GraphData } from '@antv/g6';
import G6 from '@antv/g6';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';
import MemberCard from './MemberCard';

interface IProps {
  data: GraphData;
}

const Relation: React.FunctionComponent<IProps> = (props) => {
  const domRef = useRef<HTMLDivElement>(null);
  const graph = useRef<Graph>();

  useEffect(() => {
    graph.current = new G6.Graph({
      container: ReactDOM.findDOMNode(domRef.current) as HTMLElement,
      width: domRef.current?.clientWidth || 0,
      height: domRef.current?.clientHeight || 0,
      fitView: true,
      fitViewPadding: 20,
      defaultNode: {
        type: MemberCard,
      },
      defaultEdge: {
        style: {
          stroke: '#4B7CDE',
          endArrow: {
            path: G6.Arrow.triangle(7, 7),
            fill: '#4B7CDE',
          },
        },
      },
      layout: {
        type: 'forceAtlas2',
        kr: 2500,
      },
    });
  }, []);

  useEffect(() => {
    graph.current?.read(props.data);
  }, [props.data])

  useResize(() => {
    const width = domRef.current?.clientWidth || 0;
    const height = domRef.current?.clientHeight || 0;
    graph.current?.changeSize(width, height);
    graph.current?.fitView();
  }, 200);

  return <div ref={domRef} className={styles.relationWrap}></div>;
};

export default Relation;
