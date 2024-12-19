import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Navbar = ({ state, navigation, status }) => {
  const { index } = state; // Get the active index
  const activeRouteName = state.routeNames?.[index]; // Get the active route name

  const { loading, pickupList } = useSelector((state) => state.PickupList);
  // Function to check if a tab is active
  const isActive = (screenName) => activeRouteName === screenName;
console.log(pickupList?.length)
  return (
    <View style={styles.navbar}>
      {/* Feed Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <AntDesign
          name="home"
          size={24}
          color={isActive("Home") ? "#ec1135" : "gray"} // Highlight active tab
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("Home") ? "#ec1135" : "black" },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem,{position:"relative"}]}
        onPress={() => navigation.navigate("PendingOrders")}
      >
        <MaterialIcons
          name="pending-actions"
          size={24}
          color={isActive("pending-actions") ? "#ec1135" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("pending-actions") ? "#ec1135" : "black" },
          ]}
        >
          Pending Orders
        </Text>
        <Text
         style={{
          position: "absolute",
          top: -10,
          right: "19%",
          backgroundColor: 'red',
          fontWeight:'bold',
          borderRadius: 50,
          height: 20, 
          width: 20,  
          textAlign: 'center', 
          color: 'white' 
        }}
        >{pickupList?.length}</Text>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Menu")}
      >
        <AntDesign
          name="profile"
          size={24}
          color={isActive("Menu") ? "#ec1135" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("Menu") ? "#ec1135" : "black" },
          ]}
        >
          Menu
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Orders")}
      >
        <MaterialIcons
          name="history"
          size={24}
          color={isActive("Orders") ? "#ec1135" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("Orders") ? "#ec1135" : "black" },
          ]}
        >
          Orders
        </Text>

      </TouchableOpacity>

      {/* Pocket Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Payouts")}
      >
        <MaterialIcons
          name="payment"
          size={24}
          color={isActive("Payouts") ? "#ec1135" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("Payouts") ? "#ec1135" : "black" },
          ]}
        >
          Payouts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Analytics")}
      >
        <AntDesign
          name="inbox"
          size={24}
          color={isActive("Analytics") ? "#ec1135" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("Analytics") ? "#ec1135" : "black" },
          ]}
        >
          Analytics
        </Text>
      </TouchableOpacity>


      {/* More Tab */}
      {/* <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Products")}
      >
        <AntDesign
          name="ellipsis1"
          size={24}
          color={isActive("Products") ? "#ec1135" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("Products") ? "#ec1135" : "black" },
          ]}
        >
          Products
        </Text>
      </TouchableOpacity> */}
      {/* {isActive("Menu") && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddProductForm")}
        >
          <AntDesign name="pluscircle" color={"#fff"} size={20} />
          <Text style={styles.addButtonText}>Add Items</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "black",
  },
  addButton: {
    position: "absolute",
    bottom: 75, // This positions it just above the bottom navbar
    left: "50%",
    transform: [{ translateX: 70 }],
    backgroundColor: "#ec1135",
    padding: 15,
    borderRadius: 50,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
    shadowOpacity: 0.25, // Shadow for iOS
    shadowRadius: 3.84, // Shadow for iOS
    flexDirection: "row",
  },
  addButtonText: {
    marginLeft: 5,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Navbar;
