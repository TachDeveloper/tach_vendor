import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({ isVisible, onClose, title, options }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modalContainer}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>✖</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={options}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.optionButton}>
              <View style={styles.optionContainer}>
                <Text style={styles.optionText}>{item.icon}{"  "}{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    // backgroundColor: "black",
    padding: 8
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});

export default CustomModal;
