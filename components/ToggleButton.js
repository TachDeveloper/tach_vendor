import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import * as Haptics from "expo-haptics"; // Import the Haptics module
import { useStatus } from "../constants/Context";
import axios from "axios";

const ToggleSwitchButton = () => {
  const { isOnline, setIsOnline, vendorId } = useStatus();
  const ballPosition = useRef(new Animated.Value(0)).current; // Persistent Animated.Value

  useEffect(() => {
    // Animate the ball position on state change
    Animated.timing(ballPosition, {
      toValue: isOnline ? 1 : 0, // Ball moves right if online, left if offline
      duration: 300, // Increase duration for smoother movement
      easing: Easing.inOut(Easing.ease), // Smooth in-out transition using correct Easing import
      useNativeDriver: false, // We are working with layout properties that require the main thread
    }).start();
  }, [isOnline, ballPosition]); // Runs when isOnline changes

  const toggleSwitch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Trigger haptic feedback on toggle
    axios
      .get(
        `https://tach21.in/tachapis/vendor-api/user-details.php?vendor_id=${vendorId}&status=${
          isOnline ? "0" : "1"
        }&change_status=`
      )
      .then((response) => {
        // console.log(response.data);
        setIsOnline((prevState) => !prevState);
      });
  };

  // Interpolate the ball position to move it between two points (left-right)
  const translateX = ballPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 65], // Ball moves smoothly between these two positions
  });

  // Animate the opacity for the text based on the ball position
  const offlineOpacity = ballPosition.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0], // "Offline" fades out as the ball moves right
    extrapolate: "clamp",
  });

  const onlineOpacity = ballPosition.interpolate({
    inputRange: [0.5, 1],
    outputRange: [0, 1], // "Online" fades in as the ball moves right
    extrapolate: "clamp",
  });

  const styles = StyleSheet.create({
    switchButton: {
      width: 95,
      height: 35,
      borderRadius: 30, // Rounded appearance
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      borderWidth: 0.5,
      borderColor: "#ccc",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    online: {
      backgroundColor: "green",
    },
    offline: {
      backgroundColor: "#CECECE",
    },
    switchText: {
      fontSize: 18,
      fontWeight: "500",
      color: "white",
      position: "absolute",
      zIndex: 1,
      top: 5,
    },
    ball: {
      width: 22,
      height: 22,
      backgroundColor: "white",
      borderRadius: 11, // Fully round ball
      position: "absolute",
      top: 5.7,
      left: 1,
      elevation: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3.84,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.switchButton, isOnline ? styles.online : styles.offline]}
      onPress={toggleSwitch}
      activeOpacity={0.7}
    >
      {/* "Offline" Text */}
      <Animated.Text
        style={[styles.switchText, { opacity: offlineOpacity, right: 8 }]}
      >
        Offline
      </Animated.Text>

      {/* "Online" Text */}
      <Animated.Text
        style={[styles.switchText, { opacity: onlineOpacity, left: 8 }]}
      >
        Online
      </Animated.Text>

      {/* Ball inside the switch */}
      <Animated.View style={[styles.ball, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
};

export default ToggleSwitchButton;
