// components/StarRating.js
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FiveStarRating = ({
  maxStars = 5,
  rating = 0,
  size = 20,
  filledColor = "#00A81F",
  emptyColor = "#BBBBBB",
}) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    const iconName =
      i <= rating ? "star" : i - 0.5 <= rating ? "star-half-full" : "star-outline";

    stars.push(
      <MIcons
        key={i}
        name={iconName}
        size={size}
        color={
          iconName === "star" || iconName === "star-half-full"
            ? filledColor
            : emptyColor
        }
      />
    );
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 1,
  },
});

export default FiveStarRating;
