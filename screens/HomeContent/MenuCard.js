import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Switch } from "react-native";
import { baseImageUrl } from "../../constants/Constants";
import CountDisplayEditor from "./CountEditor";
import CustomSlider from "../../components/AcceptSliderButton";
import SwipeCollapseButton from "../../components/CustomSwipButton";
import AcceptSliderButton from "../../components/AcceptSliderButton";
import RejectSliderButton from "../../components/RejectSliderButton";
import axios from "axios";

const MenuCard = ({
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
  const [isExpanded, setIsExpanded] = useState(false);
  const prevVal = false;

  const toggleSwitch = () => setIsAvailable((previousState) => !previousState);
  const toggleExpand = () => setIsExpanded((prevState) => !prevState);

  // Limit the subtitle to two lines if not expanded
  // const shouldShowMore = subtitle.length > 100; // Arbitrary limit for showing "More" option
  // const displayedSubtitle =
  //   isExpanded || !shouldShowMore ? subtitle : subtitle.slice(0, 100) + "...";

  const handleReject = (isRejected) => {
    // console.log("Reject status:", isRejected);
    if (isRejected) {
      axios
        .get(
          `https://esdy.in/tachapis/vendor-api/get-orders.php?item_id=${id}&reject_item`
        )
        .then((response) => {
          // console.log(response.data);
          onPickup(isRejected);
        });
    }
    // Handle the boolean value (true/false) as needed
  };

  const handleAccept = (isAccept) => {
    // console.log("Accept status:", isAccept);
    if (isAccept) {
      axios
        .get(
          `https://esdy.in/tachapis/vendor-api/get-orders.php?item_id=${id}&accept_item`
        )
        .then((response) => {
          // console.log(response.data);
          onPickup(isAccept);
        });
    }
    // Handle the boolean value (true/false) as needed
  };

  const handlePickup = (isPickup) => {
    // console.log("Pickup status", isPickup);
    if (isPickup) {
      axios
        .get(
          `https://esdy.in/tachapis/vendor-api/get-orders.php?item_id=${id}&ready_to_pickup`
        )
        .then((response) => {
          // console.log(response.data);
          onPickup(isPickup);
        });
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Image Section */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: baseImageUrl + img }} style={styles.cardImage} />

        {/* Right Side: Title, Subtitle, Switch, Price */}
        <View style={styles.cardContent}>
          {/* <Text style={styles.cardSubtitle} onPress={toggleExpand}>
          {displayedSubtitle}
          {shouldShowMore && isExpanded ? "" : "more"}
          </Text> */}

          {/* <Text style={styles.cardSubtitle}>
          {initialStock ? "Available" : "Out of Stock"}
          </Text> */}

          <Text style={styles.cardTitle}>{name}</Text>
          <View
            style={{
              flexDirection: card === "Order" ? "row" : "column",
              justifyContent: "space-between",
              alignItems: card === "Order" ? "center" : "",
            }}
          >
            <View>
              <Text
                style={[
                  initialStock ? styles.availableText : styles.outOfStockText,
                  { width: 80 },
                ]}
              >
                {initialStock ? "Available" : "Out of Stock"}
              </Text>
              {card === "Order" ? (
                <Text style={styles.cardPrice}>₹{price}</Text>
              ) : (
                <></>
              )}
            </View>
            {card === "Order" ? (
              <CountDisplayEditor
                initialCount={quantity}
                // onCountChange={(newCount) => setCount(newCount)}
              />
            ) : (
              <Text style={styles.cardPrice}>Qty:{quantity}</Text>
            )}
          </View>

          {/* Availability and Price Section */}
          {/* <View style={styles.cardBottom}> */}
          {/* <Text style={styles.cardPrice}>₹{price}</Text> */}

          {/* <View style={styles.availabilityContainer}> */}
          {/* <Switch
              onValueChange={toggleSwitch}
              value={isAvailable}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isAvailable ? "blue" : "#f4f3f4"}
            /> */}
          {/* <Text
              style={[
                isAvailable ? styles.availableText : styles.outOfStockText,
                { width: 80 },
              ]}
            >
              {isAvailable ? "Available" : "Out of Stock"}
            </Text> */}
          {/* </View> */}
          {/* </View> */}
        </View>
      </View>
      {/* <CustomSlider title={"Slide to Accept"} navigateTo={"Tab"} /> */}
      {/* <SwipeCollapseButton /> */}
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <AcceptSliderButton
          title={"Accept"}
          title2={card === "Order" ? "Accept" : "Pickup"}
          onAccept={card === "Order" ? handleAccept : handlePickup}
        />

        {card === "Order" ? (
          <>
            <Text></Text>
            <RejectSliderButton onReject={handleReject} />
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    // padding: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "black"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  moreText: {
    fontSize: 14,
    color: "#007BFF",
    marginVertical: 4,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  availableText: {
    // marginLeft: 10,
    fontSize: 14,
    color: "green",
  },
  outOfStockText: {
    // marginLeft: 10,
    fontSize: 14,
    color: "red",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default MenuCard;
