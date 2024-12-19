import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Image,
} from "react-native";
import { baseImageUrl } from "../../constants/Constants";
import { useStatus } from "../../constants/Context";
import axios from "axios";
import CountDisplayEditor from "../HomeContent/CountEditor";
import CustomSlider from "../../components/AcceptSliderButton";

const MenuCard2 = ({
  id,
  name,
  price,
  description,
  initialStock,
  img,
}) => {
  const [stock, setStock] = useState(initialStock);
  const [isExpanded, setIsExpanded] = useState(false);
  const { vendorId } = useStatus();

  const toggleStockStatus = () => {
    try {
      axios
        .get(
          `https://esdy.in/tachapis/vendor-api/vendor-products.php?vendor_id=${vendorId}&product_id=${id}&status=${
            initialStock ? "0" : "1"
          }&update_product`
        )
        .then((response) => {
          // console.log(response.data)
          setStock((prevStatus) => !prevStatus);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const shouldShowMore = description && description.length > 40; // Arbitrary limit for showing "More"
  const displayedDescription =
    isExpanded || !shouldShowMore
      ? description
      : description.slice(0, 40) + "...";

      
      return (
        <View style={styles.card}>
      {/* Add Photo Section */}
      <View style={styles.photoContainer}>
        <TouchableOpacity style={styles.photoButton}>
          <Image
            source={{ uri: baseImageUrl + img }}
            style={styles.cardImage}
            />
        </TouchableOpacity>
      </View>

      {/* Item Description */}
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{name}</Text>
        {price ? <Text style={styles.itemPrice}>₹{price}</Text> : <></>}

        {/* Display Description with More/Less */}
        {description && (
          // <Text style={styles.itemDescription} onPress={toggleExpand}>
          //   {displayedDescription}
          //   {!isExpanded && shouldShowMore ? "more" : "" }
          // </Text>
          <Text style={styles.itemDescription}>{displayedDescription}</Text>
        )}

        {/* Show "Less" button when expanded */}
        {/* {isExpanded && (
          <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.moreText}> Less</Text>
          </TouchableOpacity>
          )} */}
      </View>

      {/* Controls Section */}
      <View style={styles.controlsContainer}>
        {/* <TouchableOpacity style={styles.recommendButton}>
          <Text>👍 Recommend</Text>
          </TouchableOpacity> */}
        <View style={styles.stockContainer}>
          {/* Displaying stock status based on toggle */}
          <Text style={styles.stockLabel}>
            {stock ? "In stock " : "Out of stock"}
          </Text>
          <Switch
            value={stock ? true : false}
            onValueChange={toggleStockStatus}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={stock ? "rgba(0, 83, 252, 1)" : "#f4f3f4"}
            />
        </View>
        {/* {quantity && (
          <CountDisplayEditor
          initialCount={quantity}
          // onCountChange={(newCount) => setCount(newCount)}
          />
          )}  */}
      </View>
      {/* {
        quantity && <CustomSlider title={"Slide to Accept"} navigateTo={"Home"} />
        } */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  photoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    flex: 2,
    paddingLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
    // textDecorationStyle: "dashed",
    textDecorationLine: "line-through",
  },
  moreText: {
    fontSize: 12,
    color: "#007BFF",
  },
  controlsContainer: {
    flex: 2,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  recommendButton: {
    marginBottom: 10,
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockLabel: {
    fontSize: 12,
    color: "#333",
    marginRight: 5,
  },
});


export default MenuCard2;
