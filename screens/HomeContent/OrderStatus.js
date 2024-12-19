import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import TimerCard from './TimerCard';
import OrderCard2 from './OrderCard2';

const StatusCards2 = ({ Orders }) => {
  const [visibleModal, setVisibleModal] = useState(null);

  const handleOpenModal = (status) => setVisibleModal(status);
  const handleCloseModal = () => setVisibleModal(null);

  return (
    <View style={styles.container}>
      {['Orders', 'Preparing', 'Picked up'].map((status, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, styles[`card${index}`]]}
          onPress={() => handleOpenModal(status)}
        >
          <Text style={styles.status}>{status}</Text>
          <Text style={styles.count}>(0)</Text>
        </TouchableOpacity>
      ))}

      {/* Bottom Sheet for each status card */}
      <Modal
        visible={visibleModal !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{visibleModal}</Text>

            {/* Scrollable content within the modal */}
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {Orders.map((order, index) => (
                <View key={index}>
                  {
                    visibleModal==='Orders'? <OrderCard2 orderData={order} /> :  <TimerCard orderData={order} status={visibleModal?.replace("ing","e")} />
                  }
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  card: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  card0: {
    backgroundColor: '#FFAA85',
  },
  card1: {
    backgroundColor: '#8ACB88',
  },
  card2: {
    backgroundColor: '#FFCC66',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  count: {
    fontSize: 14,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    maxHeight: '80%', // Set modal height to half of the screen
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StatusCards2;