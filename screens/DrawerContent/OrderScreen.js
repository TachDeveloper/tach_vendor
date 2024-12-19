import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../../Redux/Slice/OrderSlice";
import { baseImageUrl } from "../../constants/Constants";
import { fetchVendorData } from "../../Redux/Slice/VendorSlice";
import { FontAwesome } from "@expo/vector-icons";


const OrderScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);
  const {
    data: vendorDetails,
    loading: VendorLoading,
    error: VendorError,
  } = useSelector((state) => state.vendor);
  console.log(order);

  useEffect(() => {
    dispatch(fetchOrderData(route.params.data));
    dispatch(fetchVendorData());
  }, [dispatch, route.params]);

  const handleRetry = () => {
    dispatch(fetchOrderData(route.params.data));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{flexDirection:'row', backgroundColor:'white', paddingVertical:10, }}>
          <FontAwesome style={styles.icon1} name="chevron-left" size={22} color="black"/>
          <Text style={{fontSize:18, margin:'auto', fontWeight:'bold'}}>Order Details</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container2} >
      <View style={styles.Order1}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Order Details</Text>
        <Text style={{ color: "#000", fontSize: 15, fontWeight: 'bold' }}>{order?.order_id}</Text>
      </View>
      {order && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.singleBoxContainer}>
            {/* Order Items */}
            <FlatList
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled

              data={order.items}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Image
                    source={{ uri: `${baseImageUrl}${item.img}` }}
                    style={styles.image}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.productName}>{item.product_name}</Text>
                    <Text style={styles.price}>₹ {item.purchase_price}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index}
            />

            {/* Vendor Details */}
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>Vendor Details</Text>
              <Text style={styles.vendorText}>
                Vendor Name: {vendorDetails?.name}
              </Text>
              <Text style={styles.vendorText}>
                Contact Number: {vendorDetails?.contact_number}
              </Text>
              <Text style={styles.vendorText}>
                Address: {vendorDetails?.address}
              </Text>
            </View>

            {/* Payment Summary */}
            <View style={styles.sectionContent}>
              <View style={styles.paymentContent}>
                <Text>{`Quantity (${order?.total_items} items)`}</Text>
                <Text>{`Rs ${order?.total_price}`}</Text>
              </View>
              <View style={styles.paymentContent}>
                <Text>Delivery Charges</Text>
                <Text style={{ color: "green" }}>Free</Text>
              </View>
              <View style={styles.HorizontalDivider} />
              <View style={styles.paymentContent}>
                <Text style={styles.sectionTitle}>Total Payment</Text>
                <Text style={styles.totalAmount}>₹ {order?.total_price}</Text>
              </View>
              <View style={styles.HorizontalDivider} />
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <View style={styles.paymentContent}>
                <Text>Order Id</Text>
                <Text style={{ color: "gray" }}>{order?.order_id}</Text>
              </View>
              <View style={styles.paymentContent}>
                <Text>Payment Type</Text>
                <Text style={{ color: "gray" }}>{order?.order_type}</Text>
              </View>
              <View style={styles.paymentContent}>
                <Text>Date</Text>
                <Text style={{ color: "gray" }}>{order?.order_date_time}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container2:{
    padding: 15,
    marginBottom:70,

  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  singleBoxContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  sectionContent: {
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  vendorText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 2,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  paymentContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  HorizontalDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  Order1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  icon1:{
     paddingTop:4,
     paddingLeft:10,
  }

});

export default OrderScreen;

