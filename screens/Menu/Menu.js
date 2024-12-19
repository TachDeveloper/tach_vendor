import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, StyleSheet, FlatList, Text, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SearchBar from "./SearchBar";
import MenuCard2 from "./MenuCard2";
import ImageHeader from "./ImageHeader";
import { useStatus } from "../../constants/Context";
import { useFocusEffect } from "@react-navigation/native";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [vendor, setVendor] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { search, vendorId } = useStatus();
  const slideAnim = useRef(new Animated.Value(300)).current;

  async function GetData() {
    const vendorId = await AsyncStorage.getItem("VendorId");
    axios
      .get(
        `https://tach21.com/tachapis/vendor-api/vendor-products.php?vendor_id=${vendorId}&get_products`
      )
      .then((response) => {
        setItems(response.data);
      });
  }

  async function GetVendor() {
    const vendorId = await AsyncStorage.getItem("VendorId");
    axios
      .get(
        `https://tach21.com/tachapis/vendor-api/user-details.php?vendor_id=${vendorId}&get_vendor_details`
      )
      .then((response) => {
        setVendor(response.data);
        // console.log(response.data)
      });
  }

  useEffect(() => {
    GetData();
    GetVendor();
  }, [vendorId]);

  useFocusEffect(
    useCallback(()=>{
      GetData();
    GetVendor();
    },[vendorId])
  )

  useEffect(() => {
    // Smooth sliding effect when online/offline
    Animated.spring(slideAnim, {
      toValue: search ? 300 : 0,
      friction: 8, // Controls the bounciness
      tension: 100, // Controls the stiffness of the spring
      //   duration: 300,
      useNativeDriver: true,
    }).start();
  }, [search, slideAnim]);

  const handleInputChange = (text) => {
    setSearchInput(text);
    if (text !== "") {
      const filteredItems = items.filter((item) =>
        item.product_name.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredItems);
    } else {
      setSuggestions([]);
    }
  };

  // Memoize the renderHeader to avoid unnecessary rerenders
  const renderHeader = useCallback(
    () => (
      <>
        <ImageHeader
          imageUrl="https://www.2foodtrippers.com/wp-content/uploads/2023/02/American-Chip-Bags-1024x783.jpg.webp"
          title={vendor.name}
          subtitle={vendor.email}
        />
        <View style={styles.container2}>
          <Text style={styles.title}>All Day Snacks Special</Text>
          <Text style={styles.category}>SNACKS</Text>
        </View>
      </>
    ),
    [vendor]
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Move SearchBar outside of FlatList */}
      <Animated.View
        style={[
          styles.searchContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <SearchBar
          placeholder="Search by item name"
          inputText={searchInput} // Pass the current search input
          onInputChange={handleInputChange} // Pass the change handler
        />
      </Animated.View>

      <FlatList
        data={searchInput === "" ? items : suggestions}
        ListHeaderComponent={renderHeader} // Memoized header
        keyExtractor={(item) => item.id?.toString()}
        keyboardShouldPersistTaps="always" // Always keep the keyboard open
        renderItem={({ item }) => (
          <MenuCard2
            id={item.id}
            name={item.product_name}
            price={item.selling_price}
            description={item.display_price}
            initialStock={parseInt(item.status)}
            img={item.img}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  category: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
    marginLeft: 10,
  },
  searchContainer: {
    position: "absolute",
    top: -300,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    zIndex: 99
  },
});

export default Menu;
