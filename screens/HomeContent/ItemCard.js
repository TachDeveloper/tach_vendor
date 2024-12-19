import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Feather,
} from "@expo/vector-icons";

const OrderCard3 = ({
  itemName,
  quantity,
  unitPrice,
  initialAvailability,
  isChecked,
  itemId
}) => {
  const [isAvailable, setIsAvailable] = useState(initialAvailability);
  const handleAvailabilityToggle = () => {
    // console.log(isAvailable);
    setIsAvailable(!isAvailable);
    isChecked(!isAvailable, totalPrice(),itemId);
  };

  const totalPrice = () => {
    const total = parseInt(unitPrice) * parseInt(quantity);
    return total;
  };

  //   useEffect(()=>{
  //     totalPrice()
  //   },[])

  return (
    <View
      style={[
        styles.card,
        { borderColor: isAvailable ? "#4CAF50" : "#F44336" },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.itemName}>{itemName}</Text>
        <TouchableOpacity onPress={handleAvailabilityToggle}>
          {isAvailable ? (
            <AntDesign name="checksquareo" size={30} color="#4CAF50" />
          ) : (
            <Feather name="x-square" size={30} color="#F44336" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.detailText}>Quantity: {quantity}</Text>
          <Text style={styles.detailText}> x ₹{unitPrice}</Text>
        </View>
        <Text style={styles.totalPrice}>₹{totalPrice()}</Text>
      </View>

      <View style={styles.status}>
        <FontAwesome
          name={isAvailable ? "check-circle" : "times-circle"}
          size={14}
          color={isAvailable ? "#4CAF50" : "#F44336"}
        />
        <Text
          style={[
            styles.availabilityText,
            { color: isAvailable ? "#4CAF50" : "#F44336" },
          ]}
        >
          {isAvailable ? "Available" : "Not Available"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  availabilityText: {
    marginLeft: 5,
    fontSize: 14,
  },
});

export default OrderCard3;
