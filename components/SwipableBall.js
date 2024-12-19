import React, { useState } from 'react';
import { View, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SwipeableBall = () => {
  const [translateX] = useState(new Animated.Value(0));

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      // Allow the ball to move smoothly across the container
      if (gesture.dx >= 0 && gesture.dx <= width - 80) { 
        translateX.setValue(gesture.dx);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      // Animate the ball to go to the full right side when released
      Animated.timing(translateX, {
        toValue: gesture.dx > width / 2 ? width - 80 : 0, // Full right or reset to left
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
  });

  const containerWidth = translateX.interpolate({
    inputRange: [0, width - 80],
    outputRange: [width - 40, 80], // Shrinks container from full width to the size of the ball
    extrapolate: 'clamp',
  });

  const backgroundColor = translateX.interpolate({
    inputRange: [0, width - 80],
    outputRange: ['#d3d3d3', '#90ee90'], // Gray to light green gradient
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.container,
          { width: containerWidth, backgroundColor }
        ]}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.ball,
            { transform: [{ translateX }] }
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d3d3d3',
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
  },
});

export default SwipeableBall;
