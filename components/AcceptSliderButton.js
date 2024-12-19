import React, { useEffect, useRef, useState } from "react";
import { View, Animated, PanResponder, Text, StyleSheet } from "react-native";
import { useStatus } from "../constants/Context";

const AcceptSliderButton = ({ title, onAccept, title2 }) => {
  const SLIDER_WIDTH = 350;
  const CIRCLE_SIZE = 60;
  const [isSlideComplete, setIsSlideComplete] = useState(false);
  const { swipe, setSwipe } = useStatus();

  // Pan value initialized based on title (Accept or Reject)
  const panX = useRef(
    new Animated.Value(title === "Accept" ? 0 : -(SLIDER_WIDTH - CIRCLE_SIZE))
  ).current;

  useEffect(() => {
    // Reset panX when the title changes
    panX.setValue(title === "Accept" ? 0 : -(SLIDER_WIDTH - CIRCLE_SIZE));
  }, [title]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        let newX;
        if (title === "Accept") {
          // For "Accept", the ball should move from left to right
          newX = Math.max(0, Math.min(gestureState.dx, SLIDER_WIDTH - CIRCLE_SIZE));
        } else {
          // For "Reject", the ball should move from right to left
          newX = Math.max(-(SLIDER_WIDTH - CIRCLE_SIZE), Math.min(gestureState.dx, 0));
        }
        panX.setValue(newX);
      },
      onPanResponderRelease: (_, gesture) => {
        const threshold = SLIDER_WIDTH / 2;
        if (title === "Accept" ? gesture.dx > threshold : gesture.dx < -threshold) {
          // Complete the slide
          setIsSlideComplete(true);
          Animated.spring(panX, {
            toValue: title === "Accept" ? SLIDER_WIDTH - CIRCLE_SIZE : -(SLIDER_WIDTH - CIRCLE_SIZE),
            useNativeDriver: false,
          }).start(()=>{
            onAccept(true);
            setSwipe(!swipe);
            // if(gesture.dx <= (SLIDER_WIDTH+1)) {
            //     // onAccept(true);
            //     console.log("A")
            // } else {
            //     // onAccept(false)
            //     console.log("B")
            // }
          });
        } else {
          // Reset the slider
          setIsSlideComplete(false);
          Animated.spring(panX, {
            toValue: title === "Accept" ? 0 : -(SLIDER_WIDTH - CIRCLE_SIZE),
            useNativeDriver: false,
          }).start();
        }
      }
    })
  ).current;

  const backgroundWidth = panX.interpolate({
    inputRange: [-(SLIDER_WIDTH - CIRCLE_SIZE), 0, SLIDER_WIDTH - CIRCLE_SIZE],
    outputRange: [0, 0, SLIDER_WIDTH], // For "Reject", start with no color fill.
    extrapolate: "clamp",
  });

  const styles = StyleSheet.create({
    container: {
      width: SLIDER_WIDTH,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ccc",
      flexDirection: "row",
      position: "relative",
      overflow: "hidden",
    },
    fill: {
      position: "absolute",
      // left: 0,
      left: title === "Accept" ? 0 : null,
      right: title === "Reject" ? 0 : null,
      height: "100%",
      backgroundColor: "green",
      borderRadius: 30,
      zIndex: 0, // Behind the ball
    },
    circle: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: 30,
      backgroundColor: "#000",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      zIndex: 1,
      // left: title === "Accept" ? 0 : null,
      // right: title === "Reject" ? 0 : null,
    },
    text: {
      marginBottom: 5,
      fontSize: 24,
      color: "#fff",
      transform: [{ rotate: title === "Accept" ? "0deg" : "180deg" }],
    },
    label: {
      position: "absolute",
      left: title === "Accept" ? 70 : null,
      right: title === "Reject" ? 70 : null,
      color: "#000",
      fontSize: 18,
      zIndex: 1, // Above the green background but behind the ball
    },
  });

  return (
    <View style={styles.container}>
      {/* Green background that grows as the ball moves */}
      <Animated.View
        style={[styles.fill, { width: backgroundWidth }]} // Width changes with panX
      />

      {/* Slider ball */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.circle,
          { 
            transform: [{ translateX: panX }],
            left: title === "Accept" ? 0 : SLIDER_WIDTH - CIRCLE_SIZE, // Ensure proper positioning for Reject
          },
        ]}
      >
        <Text style={styles.text}>➤</Text>
        <Text style={styles.label}>
          {title2}
        </Text>
      </Animated.View>
    </View>
  );
};

export default AcceptSliderButton;
