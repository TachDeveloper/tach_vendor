import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, FlatList, LayoutAnimation } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import MenuCard3 from './MenuCard3';

const width = Dimensions.get('window').width;

const PickupCard2 = ({
  onDelete,
  date,
  orderId,
  orderItems,
  setPickupList,
  orderType,
  totalItems,
  totalPrice,
  isExpanded, // Control expansion state from parent
  onExpand, // Callback to notify parent
}) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showCard, setShowCard] = useState(true);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else if (!isRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleToggle = () => setIsRunning((prev) => !prev);
  const handleDetailsToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onExpand(); // Notify parent of the expanded card
  };

  const handleDelete = () => {
    setShowCard(false);
    onDelete(orderId);
  };

  const handlePickup = (isPickup) => {
    setPickupList(isPickup);
  };

  const renderRightActions = (progress) => {
    const rightScale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.8],
    });

    return (
      <LinearGradient colors={['#FF512F', '#DD2476']} style={styles.rejectButton}>
        <Animated.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 20, top: 50, transform: [{ scale: rightScale }] }}>
          <Text style={styles.rejectText}>Reject</Text>
        </Animated.View>
      </LinearGradient>
    );
  };

  const renderLeftActions = (progress) => {
    const leftScale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.8],
    });

    return (
      <LinearGradient colors={['#00C9FF', '#92FE9D']} style={styles.acceptButton}>
        <Animated.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', position: 'absolute', left: 20, top: 50, transform: [{ scale: leftScale }] }}>
          <Text style={styles.acceptText}>Accept</Text>
        </Animated.View>
      </LinearGradient>
    );
  };

  const styles = StyleSheet.create({
    card: {
      display: showCard ? 'flex' : 'none',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: 'gray',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    detailsButton: {
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignSelf: 'center',
    },
    detailsButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    detailsSection: {
      marginTop: 15,
      padding: 10,
      borderRadius: 8,
      backgroundColor: '#f5f5f5',
    },
    item: {
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    rejectButton: {
      position: 'relative',
      backgroundColor: 'red',
      paddingHorizontal: width * 0.5,
    },
    acceptButton: {
      position: 'relative',
      backgroundColor: 'green',
      paddingHorizontal: width * 0.5,
    },
    rejectText: {
      fontSize: 25,
      color: '#fff',
      fontWeight: 'bold',
    },
    acceptText: {
      fontSize: 25,
      color: '#fff',
      fontWeight: 'bold',
    },
  });

  return (
    <Swipeable leftThreshold={200} rightThreshold={200} renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
          <View>
            <Text style={styles.title}>Order ID: {orderId}</Text>
            <Text style={styles.title}>Order Type: {orderType}</Text>
            <Text style={styles.title}>Total Items: {totalItems}</Text>
            <Text style={styles.title}>Total Price: ₹ {totalPrice}</Text>
            <Text style={styles.title}>Date: {date}</Text>
          </View>
          <TouchableOpacity onPress={handleDetailsToggle} style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>{isExpanded ? 'Hide Details' : 'Show Details'}</Text>
          </TouchableOpacity>
        </View>

        {isExpanded && (
          <FlatList
            data={orderItems}
            keyExtractor={(item) => item.item_id}
            renderItem={({ item }) => (
              <MenuCard3
                id={item.item_id}
                name={item.product_name}
                quantity={parseInt(item.qty)}
                initialStock={parseInt(item.status)}
                img={item.img}
                price={item.product_price}
                card={'Pickup'}
                onPickup={handlePickup}
              />
            )}
          />
        )}
      </View>
    </Swipeable>
  );
};

export default PickupCard2;
