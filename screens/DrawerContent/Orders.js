import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
} from "react-native";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import OrderDetails from "../../components/OrderDetails";
import axios from "axios";
import { useStatus } from "../../constants/Context";

const Orders = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { vendorId } = useStatus();
  const [orders, setOrders] = useState([]);
  const [expand, setExpand] = useState(false);

  const handlePress = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpand(!expand);
  };

  function getOrders() {
    axios
      .get(
        `http://tach21.in/tachapis/vendor-api/get-orders.php?vendor_id=${vendorId}&get_order_list`
      )
      .then((response) => {
        // console.log(response.data);
        setOrders(response.data);
      });
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* <Header /> */}
      <View style={styles.parent}>
        <Text style={styles.headertext}>All Orders</Text>
        {/* <ScrollView >
          {orders.map((item) => (
            <View key={item.order_id} style={styles.cardView}>
              <View style={styles.cardContainer}>
                <View style={styles.container1}>
                  <Text
                    style={{
                      color: `${
                        item.Status === "Delivered"
                          ? "green"
                          : item.Status === "Cancled"
                          ? "red"
                          : item.Status === "Pending"
                          ? "gold"
                          : "orange"
                      }`,
                      fontWeight: "bold",
                      padding: 2,
                      marginBottom: 5,
                      fontSize: 16,
                    }}
                  >
                    {item.Status}
                  </Text>
                  <Text style={styles.text}>Order ID: {item.OrderId}</Text>
                  <Text style={styles.text}>
                    Payment Type: {item.PaymentType}
                  </Text>
                  <Text style={styles.text}>
                    Total Price: {item.TotalPrice}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handlePress(item.OrderId)}>
                  <Text style={{ fontWeight: "bold", marginEnd: 5 }}>
                    {expandedOrderId === item.OrderId ? "Collapse" : "View"}
                  </Text>
                </TouchableOpacity>
              </View>
              <OrderDetails
                expand={expandedOrderId === item.OrderId}
                products={item.products}
              />
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          data={orders}
          keyExtractor={(item) => item.order_id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardView}>
              <View style={styles.cardContainer}>
                <View style={styles.container1}>
                  <Text
                    style={{
                      color: `${
                        parseInt(item.delivery_status) ? "green" : "red"
                      }`,
                      fontWeight: "bold",
                      padding: 2,
                      marginBottom: 5,
                      fontSize: 16,
                    }}
                  >
                    {parseInt(item.delivery_status) ? "Delivered" : "Cancled"}
                  </Text>
                  <Text style={styles.text}>Order ID: {item.order_id}</Text>
                  <Text style={styles.text}>Date: {item.order_date_time}</Text>
                  <Text style={styles.text}>
                    Payment Type: {item.order_type}
                  </Text>
                  <Text style={styles.text}>
                    Total Price: ₹ {item.total_price}
                  </Text>
                  <Text style={styles.text}>
                    Total Items: {item.total_items}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handlePress(item.order_id)}>
                  <Text style={{ fontWeight: "bold", marginEnd: 5 }}>
                    {expandedOrderId === item.order_id ? "Collapse" : "View"}
                  </Text>
                </TouchableOpacity>
              </View>
              {expand && (
                <OrderDetails
                  expand={expandedOrderId === item.order_id}
                  products={item.items}
                />
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    // padding: 10
    flex: 1,
  },
  headertext: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: 20,
    marginVertical: 5,
  },
  cardView: {
    // height: 100,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container1: {
    marginBottom: 5,
  },
  text: {
    fontSize: 13,
  },
});

export default Orders;
