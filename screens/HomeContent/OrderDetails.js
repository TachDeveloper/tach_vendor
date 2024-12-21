import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import OrderCard3 from "./ItemCard";
import { useDispatch, useSelector } from "react-redux";
import CustomSubHeader from "../../components/CustomSubHeader";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getVendorId, handleCallPress } from "../../utils/utils";
import { fetchPickupList } from "../../Redux/Slice/PickupListSlice";

const OrderDetailsScreen = ({ route }) => {
  const { loading, newOrders } = useSelector((state) => state.newOrders);
  const { pickupList } = useSelector((state) => state.PickupList);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [nonAvailableItems, setNonAvailabilityItems] = useState([]);

  // const orderItems = newOrders.includes(order=>order.order_id === route.params.orderId) ? newOrders.find(
  //   (order) => order.order_id === route.params.orderId
  // ) : pickupList.find(
  //   (order) => order.order_id === route.params.orderId
  // ) ;

  const orderItems =
    (Array.isArray(newOrders) &&
      newOrders.find((order) => order.order_id === route.params.orderId)) ||
    (Array.isArray(pickupList) &&
      pickupList.find((order) => order.order_id === route.params.orderId)) ||
    {};

  // console.log(newOrders.find(order=>order.order_id===route.params.orderId))
  // console.log(route);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size={"large"} />
  //     </View>
  //   );
  // }

  async function handleAcceptOrder() {
    console.log(orderItems.order_id);
    try {
      setIsLoading(true);
      const vendorId = await getVendorId();
      const response = await axios.get(
        `http://tach21.in/tachapis/vendor-api/get-orders.php?accept_order&vendor_id=${vendorId}&order_id=${orderItems.order_id}&cancel_items=${nonAvailableItems?.length > 0 ? nonAvailableItems?.join(",") : ""}`
      );
      console.log(response.data);
      console.log("Order Accepted");
      navigation.navigate("Tab");
    } catch (error) {
      console.log("Error accepting order:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRejectOrder() {
    try {
      setIsLoading(true);
      const vendorId = await getVendorId();
      const response = await axios.get(
        `http://tach21.in/tachapis/vendor-api/get-orders.php?reject_order&vendor_id=${vendorId}&order_id=${orderItems.order_id}`
      );
      // console.log(response);
      console.log("Order Rejected");
      navigation.navigate("Tab");
    } catch (error) {
      console.log("Error rejecting order:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePickupOrder() {
    setIsLoading(true);
    const vendorId = await getVendorId();
    try {
      const response = await axios.get(
        `http://tach21.in/tachapis/vendor-api/get-orders.php?ready_to_pick_order&vendor_id=${vendorId}&order_id=${orderItems.order_id}`
      );
      // console.log(response);
      console.log(response.data, "ord");
      console.log("Order Picked");
      dispatch(fetchPickupList());
      navigation.navigate("Tab");


      


    } catch (error) {
      console.log("Error marking order as ready for pickup:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function SetAmount() {
    if (orderItems.total_price) {
      setTotal(orderItems.total_price);
    }
  }

  useEffect(() => {
    SetAmount();
  }, []);

  const handleChecked = (isChecked, price, productId) => {
    setTotal((prevTotal) => prevTotal + (isChecked ? price : -price));
    setNonAvailabilityItems((prevItems) => {
      if (!isChecked) {
        // Add the productId to the array if it is checked
        return [...prevItems, productId];
      } else {
        // Remove the productId from the array if it is unchecked
        return prevItems.filter((id) => id !== productId);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <CustomSubHeader name={"Order Details"} routeName={"Tab"} />

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <ScrollView style={styles.container}>
            {/* Order Information */}
            <View style={styles.header}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderText}>
                  Order Id: {orderItems.order_id}
                </Text>
                <Text style={styles.orderText}>
                  Items: {orderItems.total_items}
                </Text>
              </View>
              <View style={styles.dateAndStatus}>
                <Text style={styles.dateText}>
                  {orderItems.order_date_time}
                </Text>
                <View style={styles.statusContainer}>
                  <FontAwesome
                    name="circle"
                    size={10}
                    color={
                      Array.isArray(newOrders) &&
                      newOrders.find(
                        (order) => order.order_id === route.params.orderId
                      )
                        ? "#FFC107"
                        : "#4CAF50"
                    }
                  />
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          Array.isArray(newOrders) &&
                          newOrders.find(
                            (order) => order.order_id === route.params.orderId
                          )
                            ? "#FFC107"
                            : "#4CAF50",
                      },
                    ]}
                  >
                    {Array.isArray(newOrders) &&
                    newOrders.find(
                      (order) => order.order_id === route.params.orderId
                    )
                      ? "Pending"
                      : "Ready for Pickup"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Order Items */}
            <Text style={styles.itemsHeader}>
              {orderItems.total_items} Items
            </Text>
            <FlatList
              data={Array.isArray(orderItems.items) ? orderItems.items : []}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <OrderCard3
                  itemId={item.item_id}
                  itemName={item.product_name}
                  volume={item.volume}
                  quantity={item.qty}
                  unitPrice={item.ctc}
                  initialAvailability={item.status === "1" ? true : false}
                  isChecked={handleChecked}
                />
              )}
              keyExtractor={(item) => item.item_id}
            />
            <View style={styles.divider}></View>
            {/* Display total amounts */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.orderText}>Item Total: </Text>
                <Text style={styles.orderText}>₹{total}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.orderText2}>Grand Total: </Text>
                <Text style={styles.orderText2}>₹{total}</Text>
              </View>
            </View>
            <View style={styles.divider}></View>
            {/* Rider Details */}
            {orderItems?.rider_mobile && (
              <View style={styles.riderDetails}>
                <View>
                  <Text style={styles.riderName}>Rider Details</Text>
                  <Text style={styles.riderName}>{orderItems.rider_name}</Text>
                  <Text style={styles.riderPhone}>
                    {orderItems.rider_mobile}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => handleCallPress(orderItems?.rider_mobile)}
                >
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}
        {Array.isArray(newOrders) &&
        newOrders.find((order) => order.order_id === route.params.orderId) ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#fff",
              paddingHorizontal: "5%",
              paddingBottom: "2.5%",
            }}
          >
            <TouchableOpacity
              style={[styles.readyButton2, { width: "50%" }]}
              onPress={handleRejectOrder}
            >
              <Text style={styles.readyButtonText2}>Reject Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.readyButton, { width: "50%" }]}
              onPress={handleAcceptOrder}
            >
              <Text style={styles.readyButtonText}>Accept Order</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.readyButton}
            onPress={handlePickupOrder}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.readyButtonText}>Ready for Pick up</Text>
            )}
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  header: {
    marginBottom: 16,
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderText2: {
    fontSize: 20,
    fontWeight: "900",
    color: "#333",
  },
  callSupportButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  callSupportText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  dateAndStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    marginLeft: 4,
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  riderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  riderName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  riderPhone: {
    fontSize: 14,
    color: "#666",
  },
  callButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  callButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  readyButton: {
    margin: 5,
    marginTop: 15,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  readyButton2: {
    marginTop: 15,
    // backgroundColor: "",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  readyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  readyButtonText2: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#d0d0d0",
    marginVertical: 10,
  },
});

export default OrderDetailsScreen;
