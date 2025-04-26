import React from 'react';
import {Dimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Line, Defs, Marker, Path} from 'react-native-svg';

type ArrowLineProps = {
  from: {x: number; y: number};
  to: {x: number; y: number};
  color?: string;
  strokeWidth?: number;
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const ArrowLine: React.FC<ArrowLineProps> = ({
  from,
  to,
  color = 'red',
  strokeWidth = 2,
}) => {
  const insets = useSafeAreaInsets();
  console.log({insets});

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: screenWidth,
        height: screenHeight,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <Svg width="100%" height="100%">
        <Defs>
          <Marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth">
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
