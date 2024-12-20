import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "react-native-vector-icons/MaterialIcons";
import { baseImageUrl } from "../../constants/Constants";
import CountDisplayEditor from "./CountEditor";
import AcceptSliderButton from "../../components/AcceptSliderButton";
import RejectSliderButton from "../../components/RejectSliderButton";
import axios from "axios";
import CustomCheckbox from "../../components/CustomCheckBox";

const MenuCard3 = ({
  img,
  name,
  quantity,
  initialStock,
  id,
  price,
  card,
  onPickup,
}) => {
  const [isAvailable, setIsAvailable] = useState(initialStock);
  const [isChecked, setIsChecked] = useState(true); // Checkbox state
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prevState) => !prevState);

  const handleReject = (isRejected) => {
    if (isRejected) {
      axios
        .get(
          `http://tach21.in/tachapis/vendor-api/get-orders.php?item_id=${id}&reject_item`
        )
        .then((response) => {
          onPickup(isRejected);
        });
    }
  };

  const handleAccept = (isAccept) => {
    if (isAccept) {
      axios
        .get(
          `http://tach21.in/tachapis/vendor-api/get-orders.php?item_id=${id}&accept_item`
        )
        .then((response) => {
          onPickup(isAccept);
        });
    }
  };

  const handlePickup = (isPickup) => {
    if (isPickup) {
      axios
        .get(
          `http://tach21.in/tachapis/vendor-api/get-orders.php?item_id=${id}&ready_to_pickup`
        )
        .then((response) => {
          onPickup(isPickup);
        });
    }
  };

  const handleChecked = (isChecked) => {
    setIsChecked(isChecked);
  }

  return (
    <View style={[styles.cardContainer, { opacity: isChecked ? 1 : 0.2 }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: baseImageUrl + img }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text
              style={[
                isAvailable ? styles.availableText : styles.outOfStockText,
              ]}
            >
              {isAvailable ? "Available" : "Out of Stock"}
            </Text>
            <Text style={styles.cardPrice}>₹{price}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            ></View>
            {card === "Order" ? (
              <CountDisplayEditor initialCount={quantity} />
            ) : (
              <Text style={styles.cardPrice}>Qty: {quantity}</Text>
            )}
          </View>
        </View>
        {/* <BouncyCheckbox
        isChecked={isChecked}
        onPress={() => setIsChecked((prev) => !prev)}
        // text="Mark as Available"
        fillColor="green"
        unfillColor="#FFFFFF"
        iconImageComponent={<Icon name="check" size={40} color="white" />}
        style={{height: "50%"}}
        iconStyle={{
          borderColor: "green",
          borderRadius: 8,
          width: 40, // Increase width
          height: 40, // Increase height
        }}
        iconImageStyle={{
          height: "80%",
          width: "80%"
        }}
        // textStyle={{
        //   color: isChecked ? "green" : "red",
        //   textDecorationLine: "none",
        // }}
      /> */}
        <CustomCheckbox onCheck={handleChecked} />
      </View>

      {/* {card === "Order" && (
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5 }}>
          <AcceptSliderButton title="Accept" onAccept={handleAccept} />
          <RejectSliderButton onReject={handleReject} />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    borderWidth: 0.5,
    borderColor: "gray"
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    // borderColor: "gray",
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    // flex: 1,
    // justifyContent: "space-between",
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  availableText: {
    fontSize: 14,
    color: "green",
  },
  outOfStockText: {
    fontSize: 14,
    color: "red",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default MenuCard3;
