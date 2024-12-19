import React, { useRef } from "react";
import { View, Animated, PanResponder, Text, StyleSheet } from "react-native";

const SLIDER_WIDTH = 350;
const CIRCLE_SIZE = 60;

const RejectSliderButton = ({ onReject }) => {
  const panX = useRef(new Animated.Value(SLIDER_WIDTH - CIRCLE_SIZE)).current; // Start from the right

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // Allow swiping left (from right to left)
        let newX = Math.max(
          0,
          Math.min(
            SLIDER_WIDTH - CIRCLE_SIZE,
            gestureState.dx + (SLIDER_WIDTH - CIRCLE_SIZE)
          )
        );
        panX.setValue(newX);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -(SLIDER_WIDTH / 3)) {
          // If swiped enough towards the left, snap the ball to the left
          Animated.spring(panX, {
            toValue: 0, // Move the ball to the far left
            useNativeDriver: false,
          }).start(()=>{
            onReject(true)
            // if(gesture.dx >= -(SLIDER_WIDTH / 2)) {
            //     onReject(true);
            // } else {
            //     onReject(false)
            // }
          });
        } else {
          // Reset the ball back to the right
          Animated.spring(panX, {
            toValue: SLIDER_WIDTH - CIRCLE_SIZE,
            useNativeDriver: false,
          }).start(()=>{
            // onReject(true);
          });
        }
      },
    })
  ).current;

  const backgroundWidth = panX.interpolate({
    inputRange: [0, SLIDER_WIDTH - CIRCLE_SIZE],
    outputRange: [SLIDER_WIDTH, 0], // Background shrinks as ball moves left
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      {/* Neutral gray background */}
      <View style={styles.background} />
      
      {/* Red fill background that shrinks as ball moves left */}
      <Animated.View
        style={[styles.fill, { width: backgroundWidth }]} // Width changes with panX
      />

      {/* Slider ball */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.circle,
          { transform: [{ translateX: panX }] }, // Moves the ball horizontally
        ]}
      >
        <Text style={styles.text}>➤</Text>
        <Text style={styles.label}>Reject</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
    height: CIRCLE_SIZE,
    borderRadius: 30,
    backgroundColor: "#ccc", // Background is gray initially
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc", // Neutral gray background
    borderRadius: 30,
    zIndex: 0, // Behind the fill and ball
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 30,
    backgroundColor: "#000",
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1, // In front of the background and fill
  },
  text: {
    marginTop: 5,
    fontSize: 24,
    color: "#fff",
    transform: [{ rotate: "180deg" }],
  },
  label: {
    position: "absolute",
    right: 70,
    color: "#000",
    fontSize: 18,
    zIndex: 1,
  },
  fill: {
    position: "absolute",
    right: 0,
    height: "100%",
    backgroundColor: "red", // Red color fill
    borderRadius: 30,
    zIndex: 0, // Behind the ball
  },
});

export default RejectSliderButton;
