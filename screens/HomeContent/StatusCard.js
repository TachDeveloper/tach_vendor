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
} from "react-native";
import OrderCard from "./OrderCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PickupCard from "./PickupCard";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useStatus } from "../../constants/Context";
import { useDispatch, useSelector } from "react-redux";
import { fetchPickupList } from "../../Redux/Slice/PickupListSlice";

const StatusCards = ({
  Orders,
  setStatusModalVisible,
  setDetailsPage,
  isAccept,
  playAudio,
  isAudioLoaded,
  stopAudio,
}) => {
  const [visibleModal, setVisibleModal] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [updatedList, setUpdatedList] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(false);
  // const [pickupList, setPickupList] = useState([]);
  const { vendorId } = useStatus();
  const dispatch = useDispatch();
  const { loading, pickupList } = useSelector((state)=>state.PickupList);

  
  

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
    // fetchPickupItems();
    dispatch(fetchPickupList());
  }, [dispatch, Orders]);

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
    // fetchPickupItems();
    dispatch(fetchPickupList());
    // setUpdatedList(!updatedList);
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
    setDetailsPage(false)
    // console.log(Orders)
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

  // function fetchPickupItems() {
  //   axios
  //     .get(
  //       `https://tach21.com/tachapis/vendor-api/get-orders.php?vendor_id=${vendorId}&ready_to_pick_items`
  //     )
  //     .then((response) => {
  //       // console.log(response.data);
  //       setPickupList(response.data);
  //     });
  // }

  // const handleDelete = (orderId) => {
  //   // Ensure we are only removing the order with the matching OrderId
  //   setOrderList((prevOrders) => {
  //     const updatedList = prevOrders.filter(order => order.OrderId !== orderId);
  //     console.log("Updated order list: ", updatedList); // Debugging line to verify the updated list
  //     return updatedList;
  //   });
  // };
  const renderPressable = (status, index) => {

      return (
        <TouchableNativeFeedback
          key={index}
          onPress={() => handleOpenModal(status)}
        >
          <View
            style={[
              styles.card,
              // index === 0 ? styles.leftCard : styles.rightCard,
              
            ]}
          >
            <Ionicons
              name={index === 0 ? "list" : "time"}
              size={24}
              color="#4B0082"
              style={styles.icon}
            />
            <View style={{flexDirection:'row', paddingTop:4,}}>
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.count}>
            {status === "Orders" ? `(${Orders.length})` : ""}
            {/* ({status === "Orders" ? Orders.length : pickupList.length}) */}
          </Text>
          </View>
          </View>
        </TouchableNativeFeedback>
      );
    }
  // console.log(Orders)
  // console.log(pickupList)
  return (
    <View style={styles.container}>
      {/* StatusContainer */}
      {/* {["Orders", "Preparing"].map((status, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, styles[`card${index}`]]}
          onPress={() => handleOpenModal(status)}
        >
          <Text style={styles.status}>{status}</Text>
          <Text style={styles.count}>({orderList.length})</Text>
        </TouchableOpacity>
      ))} */}

      {/* StatusContainer */}
      {/* <View style={styles.statusContainer}>
        {["Orders", "Preparing"].map((status, index) => (
          <Pressable
            key={index}
            style={[
              styles.card,
              index === 0 ? styles.leftCard : styles.rightCard,
            ]}
            onPress={() => handleOpenModal(status)}
          >
            <Ionicons
              name={index === 0 ? "list" : "time"}
              size={24}
              color="#4B0082"
              style={styles.icon}
            />
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.count}>({orderList.length})</Text>
          </Pressable>
        ))}
      </View> */}

      <View style={styles.statusContainer}>
        {["Orders", ].map((status, index) =>
          renderPressable(status, index)
        )}
      </View>

      {/* {["Orders", "Preparing", "Picked up"].map((status, index) => (
        <TouchableOpacity key={index} onPress={() => handleOpenModal(status)}>
          <LinearGradient
            colors={
              index === 0
                ? ["#FFAA85", "#FF512F"]
                : index === 1
                ? ["#8ACB88", "#4CAF50"]
                : ["#FFCC66", "#FFD700"]
            }
            style={[styles.card]}
          >
            <Text style={styles.status}>{status}</Text>
            <Text style={styles.count}>({orderList.length})</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))} */}

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
                    // ListHeaderComponent={renderHeader} // Memoized header
                    keyExtractor={(item) => item.order_id}
                    extraData={pickupList}
                    // keyboardShouldPersistTaps="always" // Always keep the keyboard open
                    renderItem={({ item }) => (
                      <PickupCard
                        // onDelete={handleDelete}
                        date={item.order_date_time}
                        orderId={item.order_id}
                        orderItems={item.items}
                        setPickupList={handlePickupList}
                        orderType={item.order_type}
                        totalItems={item.total_items}
                        totalPrice={item.total_price}
                        isClick={()=> {handleCloseModal(), setDetailsPage(true)}}
                      />
                    )}
                  />
                ) // <FlatList
              ) : //   data={Orders}
              //   // ListHeaderComponent={renderHeader} // Memoized header
              //   keyExtractor={(item) => item.order_id}
              //   // keyboardShouldPersistTaps="always" // Always keep the keyboard open
              //   renderItem={({ item }) => (
              //     <>
              //       {visibleModal === "Orders" ? (
              //         <OrderCard
              //           onDelete={handleDelete}
              //           date={item.order_date_time}
              //           orderId={item.order_id}
              //           orderItems={item.items}
              //           orderType={item.order_type}
              //           totalItems={item.total_items}
              //           totalPrice={item.total_price}
              //         />
              //       ) : (
              //         <PreparingCard
              //           onDelete={handleDelete}
              //           date={item.order_date_time}
              //           orderId={item.order_id}
              //           orderItems={item.items}
              //         />
              //       )}
              //     </>
              //   )}
              // />

              Orders.length > 0 ? (
                <FlatList
                  disableScrollViewPanResponder
                  data={Orders}
                  renderItem={({ item }) => (
                    <OrderCard
                      date={item.order_date_time}
                      orderId={item.order_id}
                      orderItems={item.items}
                      orderType={item.order_type}
                      totalItems={item.total_items}
                      totalPrice={item.total_price}
                      setIspickup={handleIsPickup}
                      isClick={()=> {handleCloseModal(), setDetailsPage(true)}}
                    />
                  )}
                />
              ) : (
                // Orders[0].items.length > 0 ? (
                //   <FlatList
                //     data={Orders}
                //     // ListHeaderComponent={renderHeader} // Memoized header
                //     keyExtractor={(item) => item.order_id}
                //     // keyboardShouldPersistTaps="always" // Always keep the keyboard open
                //     renderItem={({ item }) => (
                //       <OrderCard
                //         // onDelete={handleDelete}
                //         date={item.order_date_time}
                //         orderId={item.order_id}
                //         orderItems={item.items}
                //         orderType={item.order_type}
                //         totalItems={item.total_items}
                //         totalPrice={item.total_price}
                //         setIspickup={handleIsPickup}
                //       />
                //     )}
                //   />
                // ) :
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
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal:50,
  },
  card: {
    flex: 1,
    paddingVertical: 20,
    justifyContent:"space-around",
    backgroundColor: "#fff",
    flexDirection:'row',
    
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
  },
  count: {
    fontSize: 14,
    color: "#000",
    paddingLeft:3,
    paddingTop:1,
  },
  icon: {
    // marginBottom: 5,
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

export default StatusCards;
