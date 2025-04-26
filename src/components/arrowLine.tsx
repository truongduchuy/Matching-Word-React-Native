// ArrowLine.tsx
import React from 'react';
import Svg, { Line, Defs, Marker, Path } from 'react-native-svg';
import { View } from 'react-native';

type ArrowLineProps = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  strokeWidth?: number;
};

const ArrowLine: React.FC<ArrowLineProps> = ({
  from,
  to,
  color = 'red',
  strokeWidth = 2,
}) => {
  const width = Math.max(from.x, to.x) + 20;
  const height = Math.max(from.y, to.y) + 20;

  return (
    <View style={{ position: 'absolute', left: 0, top: 0 }}>
      <Svg height={height} width={width}>
        <Defs>
          <Marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <Path d="M0,0 L0,6 L6,3 z" fill={color} />
          </Marker>
        </Defs>
        <Line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={color}
          strokeWidth={strokeWidth}
          markerEnd="url(#arrowhead)"
        />
      </Svg>
    </View>
  );
};

export default ArrowLine;
