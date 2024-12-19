import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  LayoutAnimation,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import MenuCard2 from "../Menu/MenuCard2";
import MenuCard from "./MenuCard";

const width = Dimensions.get("window").width;

const OrderCard2 = ({
  onDelete,
  date,
  orderId,
  orderItems,
  orderType,
  totalItems,
  totalPrice,
  setIspickup,
}) => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current; // for text scaling

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
    setShowDetails((prev) => !prev);
  };

  // Function to handle swipe delete
  const handleDelete = () => {
    setShowCard(false); // Hide the card after swipe
    onDelete(orderId);
  };

  const handlePickup = (ispickup) => {
    setIspickup(ispickup);
    // console.log(ispickup);
  };

  // Function to render right swipe actions (Reject Order)
  const renderRightActions = (progress) => {
    const rightScale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.8], // scale from 1 to 2 based on swipe progress
    });

    return (
      <LinearGradient
        colors={["#FF512F", "#DD2476"]}
        style={styles.rejectButton}
      >
        <Animated.View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            right: 20,
            top: 45,
            transform: [{ scale: rightScale }], // Scale dynamically
          }}
        >
          <Text style={styles.rejectText}>Reject</Text>
        </Animated.View>
      </LinearGradient>
    );
  };

  // Function to render left swipe actions (Accept Order)
  const renderLeftActions = (progress) => {
    const leftScale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.8], // scale from 1 to 2 based on swipe progress
    });

    return (
      <LinearGradient
        colors={["#00C9FF", "#92FE9D"]}
        style={styles.acceptButton}
      >
        <Animated.View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            left: 20,
            top: 45,
            transform: [{ scale: leftScale }], // Scale dynamically
          }}
        >
          <Text style={styles.acceptText}>Accept</Text>
        </Animated.View>
      </LinearGradient>
    );
  };

  const styles = StyleSheet.create({
    card: {
      display: showCard ? "flex" : "none", // Toggle visibility based on 'showCard'
      // padding: 15,
      marginVertical: 10,
      // borderRadius: 10,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333",
    },
    value: {
      fontSize: 16,
      color: "#666",
    },
    detailsButton: {
      backgroundColor: "#000",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      // marginTop: 15,
      alignSelf: "center",
    },
    detailsButtonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    detailsSection: {
      marginTop: 15,
      padding: 10,
      borderRadius: 8,
      backgroundColor: "#f5f5f5",
    },
    item: {
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    swipeButton: {
      justifyContent: "center",
      flex: 1,
    },
    swipeTextContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      paddingHorizontal: 20,
      top: 50,
    },
    rejectButton: {
      position: "relative",
      backgroundColor: "red",
      paddingHorizontal: width * 0.5,
      // marginTop: 10,
      marginBottom: 10,
    },
    acceptButton: {
      position: "relative",
      backgroundColor: "green",
      paddingHorizontal: width * 0.5,
      // marginTop: 10,
      marginBottom: 10,
    },
    rejectText: {
      fontSize: 25,
      color: "#fff",
      fontWeight: "bold",
    },
    acceptText: {
      fontSize: 25,
      color: "#fff",
      fontWeight: "bold",
    },
  });

  return (
    <Swipeable
      leftThreshold={100}
      rightThreshold={100}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableOpen={handleDelete}
    >
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
          }}
        >
          <View>
            <Text style={styles.title}>Order ID: {orderId}</Text>
            <Text style={styles.title}>Order Type: {orderType}</Text>
            <Text style={styles.title}>Total Items: {totalItems}</Text>
            <Text style={styles.title}>Total Price: ₹ {totalPrice}</Text>
            <Text style={styles.title}>Date: {date}</Text>
          </View>
          <TouchableOpacity
            onPress={handleDetailsToggle}
            style={styles.detailsButton}
          >
            <Text style={styles.detailsButtonText}>
              {showDetails ? "Hide Details" : "Show Details"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.value}>Product: {productName}</Text>
        <Text style={styles.value}>Quantity: {quantity}</Text>
        <Text style={styles.value}>Pickup: {pickup}</Text>
        <Text style={styles.value}>Status: {status}</Text> */}

        {showDetails && (
          <FlatList
            // style={{backgroundColor:"#f0f0f0"}}
            // nestedScrollEnabled
            data={orderItems}
            keyExtractor={(item) => item.item_id}
            renderItem={({ item }) => (
              <MenuCard
                id={item.item_id}
                name={item.product_name}
                quantity={parseInt(item.qty)}
                initialStock={parseInt(item.status)}
                img={item.img}
                price={item.product_price}
                card={"Order"}
                onPickup={handlePickup}
                // setCount={item.qty}
              />
            )}
          />
        )}
      </View>
    </Swipeable>
  );
};

export default OrderCard2;
