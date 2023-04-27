import Relation from '@/components/charts/Relation';
import InfoBlock from '@/components/layout/InfoBlock';
import type { GraphData } from '@antv/g6';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less'

const SocialContact: React.FunctionComponent = () => {
  const [data, setData] = useState<GraphData>({})
  const { familyInfo, baseInfo } = useModel('crimeStore.crimeFile');

  useEffect(() => {
    const nodes: GraphData['nodes'] = []
    const edges: GraphData['edges'] = []
    nodes.push({
      id: baseInfo?.id || '',
      label: baseInfo?.name || '',
      style: {
        width: 70,
        height: 70,
        radius: 35,
        fill: '#1B4192',
      },
    })
    familyInfo?.forEach((item, index) => {
      nodes.push({
        id: String(index),
        label: item.XM,
      })
      edges.push({
        source: baseInfo?.id,
        target: String(index),
        label: item.GXLBNAME
      })
    })
    setData({
      nodes,
      edges
    })
  }, [baseInfo, familyInfo])

  return (
    <InfoBlock title="社交关系图">
      <div className={styles.socialWrap}>
        <Relation data={data} />
      </div>
    </InfoBlock>
  );
};

export default SocialContact;
