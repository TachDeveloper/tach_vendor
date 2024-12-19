import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Make sure to install and link this package if using

const CustomCheckbox = ({ label, onCheck }) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    if (onCheck) {
      onCheck(!isChecked);
    }
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
      <View
        style={[
          styles.checkbox,
          isChecked ? styles.checked : styles.unchecked,
          { borderRadius: isChecked ? 6 : 6 }, // Customizable: circular if unchecked, square if checked
        ]}
      >
        {isChecked && (
          <Icon name="check" size={16} color="white" /> // Icon visible only if checked
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginEnd: "3%"
  },
  checkbox: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  checked: {
    backgroundColor: "green",
    borderColor: "green",
  },
  unchecked: {
    backgroundColor: "white",
    borderColor: "gray",
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default CustomCheckbox;
