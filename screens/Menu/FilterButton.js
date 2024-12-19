import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterButton = ({ label, onPress, selected }) => {
  // Local state to handle toggle (if necessary)
  const [isSelected, setIsSelected] = useState(selected);

  const handlePress = () => {
    // Toggle the selection state
    setIsSelected(!isSelected);
    // Call the parent-provided onPress handler if it exists
    if (onPress) {
      onPress(!isSelected);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected ? styles.selectedButton : styles.unselectedButton,
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.text, isSelected ? styles.selectedText : styles.unselectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
    marginVertical: 10,
    elevation: 2, // For a subtle shadow on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  selectedButton: {
    backgroundColor: '#4CAF50', // Green color when selected
    borderColor: '#4CAF50',
  },
  unselectedButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  text: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#333',
  },
});

export default FilterButton;
