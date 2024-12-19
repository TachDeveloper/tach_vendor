import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CountDisplayEditor = ({ initialCount, onCountChange }) => {
  const [count, setCount] = useState(initialCount);
  const incrementInterval = useRef(null);
  const decrementInterval = useRef(null);

  // Handle props update (if initialCount changes externally)
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  // Notify parent component when the count changes
  useEffect(() => {
    if (onCountChange) {
      onCountChange(count);
    }
  }, [count, onCountChange]);

  // Increment the count
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  // Decrement the count, ensuring it doesn't go below zero
  const handleDecrement = () => {
    setCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  // Start continuous increment when holding down the button
  const startIncrement = () => {
    handleIncrement();
    incrementInterval.current = setInterval(handleIncrement, 100); // Fast increment every 100ms
  };

  // Start continuous decrement when holding down the button
  const startDecrement = () => {
    handleDecrement();
    decrementInterval.current = setInterval(handleDecrement, 100); // Fast decrement every 100ms
  };

  // Stop the interval for both increment and decrement
  const stopContinuousChange = () => {
    if (incrementInterval.current) {
      clearInterval(incrementInterval.current);
    }
    if (decrementInterval.current) {
      clearInterval(decrementInterval.current);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleDecrement}
        onLongPress={startDecrement}
        onPressOut={stopContinuousChange}
        disabled={true}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.countText}>{count}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleIncrement}
        onLongPress={startIncrement}
        onPressOut={stopContinuousChange}
        disabled={true}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: "40%",
    padding: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  button: {
    padding: 8,
    // backgroundColor: '#4B0082',
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  buttonText: {
    // color: '#fff',
    color: "#000",
    fontSize: 18,
    fontWeight: 'bold',
  },
  countText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

export default CountDisplayEditor;
