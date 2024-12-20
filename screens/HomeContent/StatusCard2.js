import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  Platform,
  TouchableNativeFeedback,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import OrderCard from "./OrderCard";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import PickupCard from "./PickupCard";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useStatus } from "../../constants/Context";
import OrderCard2 from "./OrderCard2";
import PickupCard2 from "./PickupCard2";

const StatusCards2 = ({
  Orders,
  setStatusModalVisible,
  isAccept,
  playAudio,
  isAudioLoaded,
  stopAudio,
}) => {
  const [visibleModal, setVisibleModal] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [updatedList, setUpdatedList] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(false);
  const [pickupList, setPickupList] = useState([]);
  const { vendorId } = useStatus();
  const [currentExpandedId, setCurrentExpandedId] = useState(null);

  const handleExpand = (id) => {
    setCurrentExpandedId((prevId) => (prevId === id ? null : id));
  };

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     const { status } = await Audio.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.error("Permission to access audio was denied");
  //       return;
  //     }
  //   };

  //   requestPermissions();
  // }, []);

  // Update the orderList whenever Orders prop changes
  useEffect(() => {
    if (Orders && Orders.length > 0) {
      setOrderList(Orders);
    }
    fetchPickupItems();
  }, [Orders]);

  useEffect(() => {
    if (Orders.length > 0 && isAudioLoaded) {
      setVisibleModal("Orders");
      setStatusModalVisible(true);
      playAudio();
    }
  }, [isAudioLoaded]);

  // useEffect(() => {
  // }, [updatedList]);

  const handlePickupList = (isPickup) => {
    // console.log(isPickup);
    fetchPickupItems();
    setUpdatedList(!updatedList);
  };

  const handleIsPickup = (isPickup) => {
    // setUpdatedList(isPickup);
    isAccept(isPickup);
  };

  // useEffect(() => {
  //   if (orderList && orderList.length > 0) {
  //     if (updatedList.length === 0) {
  //     } else {
  //       setOrderList(updatedList);
  //     }
  //   } else {
  //     // setOrderList(Orders);
  //   }
  // }, [itemRemoved]);

  const handleOpenModal = (status) => {
    setVisibleModal(status);
    setStatusModalVisible(true);
    // console.log(Orders);
    if (Orders.length > 0) {
      playAudio();
    }
  };
  const handleCloseModal = () => {
    setVisibleModal(null);
    setStatusModalVisible(false);
    stopAudio();
  };

  //Function to handle deletion of an order
  // const handleDelete = (orderId) => {
  //   setUpdatedList((prevOrders) =>
  //     prevOrders.filter((order) => order.OrderId !== orderId)
  //   );
  //   setItemRemoved(!itemRemoved);
  // };

  function fetchPickupItems() {
    axios
      .get(
        `http://tach21.in/tachapis/vendor-api/get-orders.php?vendor_id=${vendorId}&ready_to_pick_items`
      )
      .then((response) => {
        // console.log(response.data);
        setPickupList(response.data);
      });
  }

  // const handleDelete = (orderId) => {
  //   // Ensure we are only removing the order with the matching OrderId
  //   setOrderList((prevOrders) => {
  //     const updatedList = prevOrders.filter(order => order.OrderId !== orderId);
  //     console.log("Updated order list: ", updatedList); // Debugging line to verify the updated list
  //     return updatedList;
  //   });
  // };

  const renderPressable = (status, index) => {
    if (Platform.OS === "android") {
      return (
        <Pressable
          key={index}
          android_ripple={{ color: "#e0e0e0" }}
          style={[
            styles.card,
            index === 0 ? styles.leftCard : styles.rightCard,
          ]}
          onPress={() => handleOpenModal(status)}
        >
          <Ionicons
            name={index === 0 ? "list" : "time"}
            size={24}
            color="#000"
            style={styles.icon}
          />
          <Text style={styles.status}>{status}</Text>
          <Text style={styles.count}>
            ({status === "Orders" ? Orders.length : pickupList.length})
          </Text>
        </Pressable>
      );
    } else {
      return (
        <TouchableNativeFeedback
          key={index}
          onPress={() => handleOpenModal(status)}
        >
          <View
            style={[
              styles.card,
              index === 0 ? styles.leftCard : styles.rightCard,
            ]}
          >
            <Ionicons
              name={index === 0 ? "list" : "time"}
              size={24}
              color="#4B0082"
              style={styles.icon}
            />
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.count}>({orderList.length})</Text>
          </View>
        </TouchableNativeFeedback>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        {["Orders", "Preparing"].map((status, index) =>
          renderPressable(status, index)
        )}
      </View>

      {/* Bottom Sheet for each status card */}
      <Modal
        visible={visibleModal !== null}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={handleCloseModal}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={handleCloseModal}
            style={{ flex: 1 }}
          >
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{visibleModal}</Text>

              {/* Scrollable content within the modal */}
              {/* <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {orderList.length > 0 ? (
                  orderList.map((order, index) => (
                    <View key={index}>
                      {visibleModal === "Orders" ? (
                        <OrderCard orderData={order} onDelete={handleDelete} /> // Pass the delete function
                      ) : (
                        <PreparingCard
                          orderData={order}
                          onDelete={handleDelete}
                        />
                      )}
                    </View>
                  ))
                ) : (
                  <Text>No orders available</Text>
                )}
              </ScrollView> */}

              {visibleModal === "Preparing" ? (
                pickupList.length <= 0 ? (
                  <Text style={{ marginHorizontal: 20 }}>
                    No orders available
                  </Text>
                ) : (
                  <FlatList
                    data={pickupList}
                    disableScrollViewPanResponder
                    keyExtractor={(item) => item.order_id}
                    extraData={pickupList}
                    renderItem={({ item }) => (
                      <PickupCard2
                        // onDelete={handleDelete}
                        date={item.order_date_time}
                        orderId={item.order_id}
                        orderItems={item.items}
                        setPickupList={handlePickupList}
                        orderType={item.order_type}
                        totalItems={item.total_items}
                        totalPrice={item.total_price}
                        isExpanded={currentExpandedId === item.orderId}
                        onExpand={() => handleExpand(item.orderId)}
                      />
                    )}
                  />
                )
              ) : Orders.length > 0 ? (
                <FlatList
                  disableScrollViewPanResponder
                  data={Orders}
                  renderItem={({ item }) => (
                    <OrderCard2
                      date={item.order_date_time}
                      orderId={item.order_id}
                      orderItems={item.items}
                      orderType={item.order_type}
                      totalItems={item.total_items}
                      totalPrice={item.total_price}
                      setIspickup={handleIsPickup}
                    />
                  )}
                />
              ) : (
                <Text style={{ marginHorizontal: 20 }}>
                  No orders available
                </Text>
              )}

              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // justifyContent: "space-around",
    marginTop: 50,
    alignItems: "center",
  },
  // card: {
  //   width: 110,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 20,
  //   paddingVertical: 15,
  //   paddingHorizontal: 15,
  //   backgroundColor: "#fff",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 5,
  //   elevation: 5,
  // },
  statusContainer: {
    flexDirection: "row",
    // borderWidth: 2,
    borderColor: "#4B0082",
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  leftCard: {
    borderRightWidth: 1,
    borderRightColor: "#E8E8E8",
  },
  rightCard: {
    borderLeftWidth: 1,
    borderLeftColor: "#E8E8E8",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  count: {
    fontSize: 14,
    color: "#000",
  },
  icon: {
    marginBottom: 5,
  },
  card0: {
    backgroundColor: "#FFAA85",
  },
  card1: {
    backgroundColor: "#8ACB88",
  },
  card2: {
    backgroundColor: "#FFCC66",
  },
  // status: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "#4B0082",
  //   marginTop: 5,
  // },
  // count: {
  //   fontSize: 14,
  //   color: "#4B0082",
  // },
  // icon: {
  //   marginBottom: 5,
  // },
  modalContainer: {
    // flex: 1,
    maxHeight: "61%",
    justifyContent: "flex-end",
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalBackdrop: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContent: {
    // Set modal height to half of the screen
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "red",
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StatusCards2;
