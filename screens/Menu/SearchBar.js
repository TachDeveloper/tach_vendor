import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Icon library

const SearchBar = ({ placeholder, inputText, onInputChange }) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={inputText} // Control the input with state from the parent
        onChangeText={onInputChange} // Call the function passed from the parent
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
  },
  input: {
    flex: 1, 
    height: 40,
    fontSize: 16,
    paddingLeft: 0,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchBar;
