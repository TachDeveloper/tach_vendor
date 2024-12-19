import React, { useState } from 'react';
import { View, Text, Animated, PanResponder, StyleSheet, Dimensions, Easing } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SwipeCollapseButton = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const animatedValue = new Animated.Value(0);
  const maxSwipeDistance = SCREEN_WIDTH - 75; // Ball should go all the way to the right

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      // Only allow swiping to the right
      if (gestureState.dx >= 0 && gestureState.dx <= maxSwipeDistance) {
        animatedValue.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > maxSwipeDistance / 2) {
        // Complete the swipe if more than halfway
        Animated.timing(animatedValue, {
          toValue: maxSwipeDistance,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease), // Smooth easing
        }).start(() => setIsCollapsed(true));
      } else {
        // Snap back if not enough swipe
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.ease), // Smooth easing
        }).start(() => setIsCollapsed(false));
      }
    },
  });

  const leftContainerWidth = animatedValue.interpolate({
    inputRange: [0, maxSwipeDistance],
    outputRange: ['100%', '0%'], // Shrinks the left side of the container
    extrapolate: 'clamp',
  });

  const ballPosition = animatedValue.interpolate({
    inputRange: [0, maxSwipeDistance],
    outputRange: [0, maxSwipeDistance], // Move the ball fully to the right
    extrapolate: 'clamp',
  });

  const textOpacity = animatedValue.interpolate({
    inputRange: [0, maxSwipeDistance / 2],
    outputRange: [1, 0], // Fade out the text
    extrapolate: 'clamp',
  });

  // Interpolating the background colors for gradient effect
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, maxSwipeDistance],
    outputRange: ['rgba(211, 211, 211, 1)', 'rgba(144, 238, 144, 1)'], // grayish to light green
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.outerContainer}>
      <Animated.View
        style={[
          styles.fixedRightContainer,
          {
            backgroundColor, // Interpolated gradient background color
          },
        ]}
      >
        <Animated.View style={[styles.shrinkingLeftContainer, { width: leftContainerWidth }]}>
          <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
            Medical ID
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[styles.ball, { transform: [{ translateX: ballPosition }] }]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.icon}>*</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50, // Adjust height based on the design
  },
  fixedRightContainer: {
    width: '100%', // Fixed width for the container
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative', // Relative for absolute positioning of the shrinking left side
  },
  shrinkingLeftContainer: {
    height: 50,
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    backgroundColor: 'transparent', // No background color
    paddingLeft: 15,
  },
  ball: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Allows free movement of the ball
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    fontSize: 24,
    color: 'red', // Color of the asterisk
  },
});

export default SwipeCollapseButton;
