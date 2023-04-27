import React from 'react';
import styles from './index.less';

export interface LineObj {
  start: [string, string];
  center?: [string, string];
  end: [string, string];
  text: [string, string, string];
}

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  data: LineObj[];
}

const SvgLineRelation: React.FunctionComponent<IProps> = (props) => (
  <svg
    className={`${styles.svgDrew} ${props.className || ''}`}
    style={props.style}
    height="100%"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    {props.data.map((item, index) => (
      <React.Fragment key={String(index)}>
        <line
          x1={item.start[0]}
          y1={item.start[1]}
          x2={item.center ? item.center[0] : item.end[0]}
          y2={item.center ? item.center[1] : item.end[1]}
          style={{ stroke: 'rgb(0,161,231)', strokeWidth: 2 }}
        />
        {item.end && (
          <line
            x1={item.center ? item.center[0] : item.start[0]}
            y1={item.center ? item.center[1] : item.start[1]}
            x2={item.end[0]}
            y2={item.end[1]}
            style={{ stroke: 'rgb(0,161,231)', strokeWidth: 2 }}
          />
        )}

        <circle cx={item.start[0]} cy={item.start[1]} r="2" fill="#00A1E7" />
        <circle cx={item.end[0]} cy={item.end[1]} r="2" fill="#00A1E7" />
        <text x={item.text[1]} y={item.text[2]} fill="#fff" fontSize="10">
          {item.text[0]}
        </text>
      </React.Fragment>
    ))}
  </svg>
);

export default SvgLineRelation;
