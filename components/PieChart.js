import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, G, Text as SvgText } from 'react-native-svg';
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const AnimatedPath = Animated.createAnimatedComponent(Path);

const PieChart = ({ data, percentageKey, colorKey, radius = width / 3, duration = 1000 }) => {
  let cumulativeAngle = -Math.PI / 2;
  const animatedValues = Object.values(data).map(() => useSharedValue(0));

  
  useFocusEffect(
    React.useCallback(() => {
      animatedValues.forEach((animatedValue, index) => {
        animatedValue.value = withTiming(Object.values(data)[index][percentageKey], {
          duration,
          easing: Easing.out(Easing.cubic),
        });
      });
      return () => {};
    }, [data, animatedValues, duration, percentageKey])
  );

  const arcs = Object.entries(data).map(([category, item], index) => {
    const percentage = item[percentageKey];
    const color = item[colorKey];
    const arcLength = (percentage / 100) * 2 * Math.PI;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + arcLength;
    cumulativeAngle = endAngle;

    const x1 = radius * Math.cos(startAngle);
    const y1 = radius * Math.sin(startAngle);
    const x2 = radius * Math.cos(endAngle);
    const y2 = radius * Math.sin(endAngle);
    const largeArcFlag = arcLength > Math.PI ? 1 : 0;

    const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const animatedProps = useAnimatedProps(() => {
      const animatedArcLength = (animatedValues[index].value / 100) * 2 * Math.PI;
      const animatedEndAngle = startAngle + animatedArcLength;

      const x2Animated = radius * Math.cos(animatedEndAngle);
      const y2Animated = radius * Math.sin(animatedEndAngle);
      const largeArcFlagAnimated = animatedArcLength > Math.PI ? 1 : 0;

      return {
        d: `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlagAnimated} 1 ${x2Animated} ${y2Animated} Z`,
      };
    });

    return {
      category,
      path,
      animatedProps,
      color,
      percentage,
      startAngle,
      endAngle,
    };
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={radius * 2} height={radius * 2} viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}>
        <G>
          {arcs.map((arc, index) => (
            <AnimatedPath key={index} animatedProps={arc.animatedProps} fill={arc.color} />
          ))}
          {arcs.map((arc, index) => {
            const labelAngle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
            const labelX = radius * 0.5 * Math.cos(labelAngle);
            const labelY = radius * 0.5 * Math.sin(labelAngle);

            const textColor = '#fff';
            const fontSize = arc.percentage > 10 ? radius * 0.12 : radius * 0.1;

            return (
              <G key={`label-${index}`} transform={`translate(${labelX}, ${labelY})`}>
                <SvgText
                  y={fontSize * 1.2}
                  fill={textColor}
                  fontSize={fontSize}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {`${arc.percentage}%`}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

export default PieChart;
