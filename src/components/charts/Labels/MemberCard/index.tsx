import type { ModelConfig } from '@antv/g6';
import G6 from '@antv/g6';
import { createNodeFromReact, Group, Rect, Text } from '@antv/g6-react-node';
import React from 'react';

interface IProps {
  cfg: ModelConfig;
}

const Card: React.FunctionComponent<IProps> = ({cfg}) => {
  return (
    <Group draggable>
      <Rect
        style={{
          width: cfg.style?.width || 100,
          height: cfg.style?.height || 100,
          fill: cfg.style?.fill || '#4B7CDE',
          radius: [cfg.style?.radius || 50],
          justifyContent: 'center',
          padding: [18, 0],
        }}
        draggable
      >
        <Text
          style={{
            fill: '#fff',
            margin: [0, 'auto'],
            fontSize: 12,
            fontWeight: 'bold',
          }}
        >
          { cfg.label }
        </Text>
      </Rect>
    </Group>
  );
};

const nodeName = 'memberCard';
G6.registerNode(nodeName, createNodeFromReact(Card));

export default nodeName;
