import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import CustomSubHeader from "../../components/CustomSubHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { getVendorId } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayouts } from "../../Redux/Slice/PayoutSlice";

const Payouts = () => {
  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState("This Week");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customRangeModalVisible, setCustomRangeModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [apiData, setApiData] = useState(null);
  const dispatch = useDispatch();
  const { loading, payouts, error } = useSelector((state) => state.Payouts);
  // console.log(payouts);

  const options = [
    "Today",
    "Yesterday",
    "This Week",
    "Last 7 days",
    "Last Week",
    "This Month",
    "Last 30 days",
    "Last Month",
    "Last 6 months",
    "Last year",
    "Lifetime",
    "Custom Range",
  ];

  const handleSelect = (option) => {
    setSelectedValue(option);
    setIsDropdownOpen(false);
  };

  const openDropdown = () => {
    setModalVisible(true);
  };
  const closeDropdown = () => {
    setModalVisible(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    if (option === "Custom Range") {
      setCustomRangeModalVisible(true); // Show custom range modal
    } else {
      setCustomRangeModalVisible(false); // Hide custom range modal
    }
    closeDropdown();
  };

  const onChangeDate = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (isStartDate) {
      setStartDate(selectedDate || startDate);
    } else {
      setEndDate(selectedDate || endDate);
    }
    setShowDatePicker(false);
  };

  const toggleDatePicker = (isStart) => {
    setIsStartDate(isStart);
    setShowDatePicker(true);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const vendorId = await getVendorId();
  //       const response = await axios.get(
  //         `https://esdy.in/tachapis/vendor-api/get-orders.php?vendor_insights&vendor_id=${vendorId}&dateFilter=${selectedValue}`,
  //         {
  //           params: {
  //             vendor_insights: true,
  //             vendor_id: 3,
  //             dateFilter: selectedValue,
  //           },
  //         }
  //       );
  //       setApiData(response.data);

  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [selectedValue]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchPayouts(selectedValue));
    }, [dispatch])
  );

  const updateFilter = () => {
    let filter = { dateFilter: selectedValue };
    if (selectedValue === "Custom Range") {
      filter = {
        ...filter,
        customRange: {
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
        },
      };
    }
    dispatch(fetchPayouts(filter));
  };

  useEffect(() => {
    if (selectedValue !== "Custom Range") {
      updateFilter();
    }
  }, [selectedValue]);

  console.log(payouts)

  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate("OrderScreen", { data: item.order_id })}>
      <Text style={styles.orderId}>{item.order_id}</Text>
      <Text style={styles.orderDetails}>
        {item.total_items} Items | {item.order_date_time}
      </Text>
      <Text style={styles.orderPrice}>₹{item.total_price}</Text>
      <View style={styles.HorizontalDivider} />
      <Text
        style={[
          styles.orderStatus,
          { color: item.delivery_status === "1" ? "green" : "red" },
        ]}
      >
        ● {item.delivery_status === "1" ? "Delivered" : "Rejected"}
      </Text>
    </TouchableOpacity>
  );

  // console.log("selected values", selectedValue);
  return (
    <View style={{ flex: 1 }}>
      <CustomSubHeader name={"Payouts"} routeName={"Home"} />
      <View style={styles.container}>
        {/* Header */}
        {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.backButton}>
                        <FontAwesome name="chevron-left" size={24} color="black" />
                    </Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Payout</Text>
                <View style={{ width: 24 }} />
            </View> */}

        {/* Amount Receivable */}
        <View style={styles.receivableContainer}>
          <Text style={styles.receivableText}>Amount Receivable</Text>
          <Text style={styles.receivableAmount} adjustsFontSizeToFit numberOfLines={1}>
            ₹ {parseFloat(payouts?.vendor_insights?.balance_pending || 0).toFixed(2)}
          </Text>
        </View>

        {/* Insights Section */}
        <View style={styles.insightsContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <Text style={styles.insightsTitle}>Insights</Text>
            <View style={styles.selectcontainer}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  //   setIsDropdownOpen(!isDropdownOpen);
                  openDropdown();
                }}
              >
                <Text style={styles.dropdownText}>{selectedValue}</Text>
                <Icon name="arrow-drop-down" size={24} color="#333" />
              </TouchableOpacity>

              {/* {isDropdownOpen && (
                <View style={styles.optionsContainer}>
                  <ScrollView nestedScrollEnabled>
                    {options.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleSelect(item)}
                          style={styles.option}
                        >
                          <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  <FlatList
                        data={options}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.option}>
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
              )} */}
            </View>
          </View>
          <View style={styles.insightsRow}>
            <View style={styles.insightBox}>
              <Text style={styles.insightText}>Total{"\n"}Sales</Text>
              <View style={styles.verticalDivider} />
              <Text style={styles.insightValue} adjustsFontSizeToFit numberOfLines={1}>
                ₹{parseFloat(payouts?.vendor_insights?.total_sales|| 0).toFixed(2)}
              </Text>
            </View>
            <View style={styles.insightBox}>
              <Text style={styles.insightText}>Total{"\n"}Orders</Text>
              <View style={styles.verticalDivider} />
              <Text style={styles.insightValue} adjustsFontSizeToFit numberOfLines={1}>
                {parseFloat(payouts?.vendor_insights?.total_orders || 0).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.insightsRow}>
            <View style={styles.insightBox}>
              <Text style={styles.insightText}>Amount{"\n"}Received</Text>
              <View style={styles.verticalDivider} />
              <Text style={styles.insightValue} adjustsFontSizeToFit numberOfLines={1}>
                ₹{parseFloat(payouts?.vendor_insights?.total_payout || 0).toFixed(2)}
              </Text>
            </View>
            <View style={styles.insightBox}>
              <Text style={styles.insightText}>Amount{"\n"}Receivable</Text>
              <View style={styles.verticalDivider} />
              <Text style={styles.insightValue} adjustsFontSizeToFit numberOfLines={1}>
                ₹{parseFloat(payouts?.vendor_insights?.balance_pending || 0).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Past Orders Section */}
        {payouts?.orders?.length >= 1 ? (
          <Text style={styles.pastOrdersTitle}>Past Orders</Text>
        ) : (
          <></>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={payouts?.orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.order_id}
        // contentContainerStyle={styles.listContainer}
        />

        {/* <View style={styles.orderCard}>
          <Text style={styles.orderId}>Order Id #123</Text>
          <Text style={styles.orderDetails}>
            2 Items | 28 Oct 2024, 5:21 PM
          </Text>
          <Text style={styles.orderPrice}>₹174</Text>
          <View style={styles.HorizontalDivider} />
          <Text style={styles.orderStatus}>● Delivered</Text>
        </View> */}

        {/* Repeat Past Order Card */}
        {/* <View style={styles.orderCard}>
          <Text style={styles.orderId}>Order Id #123</Text>
          <Text style={styles.orderDetails}>
            2 Items | 28 Oct 2024, 5:21 PM
          </Text>
          <Text style={styles.orderPrice}>₹174</Text>
          <View style={styles.HorizontalDivider} />
          <Text style={styles.orderStatus}>● Delivered</Text>
        </View> */}

        {/* <View style={styles.orderCard}>
          <Text style={styles.orderId}>Order Id #123</Text>
          <Text style={styles.orderDetails}>
            2 Items | 28 Oct 2024, 5:21 PM
          </Text>
          <Text style={styles.orderPrice}>₹174</Text>
          <View style={styles.HorizontalDivider} />
          <Text style={styles.orderStatus}>● Delivered</Text>
        </View> */}
      </View>
      <Modal transparent visible={modalVisible} animationType="none">
        <TouchableOpacity style={styles.modalOverlay} onPress={closeDropdown}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeDropdown} style={styles.closeIcon}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal transparent visible={customRangeModalVisible} animationType="none">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setCustomRangeModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Date Range</Text>
            <TouchableOpacity
              onPress={() => toggleDatePicker(true)}
              style={styles.datePickerToggle}
            >
              <Text style={styles.datePickerToggleText}>
                Start Date: {startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleDatePicker(false)}
              style={styles.datePickerToggle}
            >
              <Text style={styles.datePickerToggleText}>
                End Date: {endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={isStartDate ? startDate : endDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                updateFilter();
                setCustomRangeModalVisible(false);
              }} // Close the custom range modal after selection
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  backButton: {
    paddingRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  receivableContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF4E5",
    borderWidth: 1,
    // borderColor: "#FF7043",
    borderColor: "orange",
    // borderStyle: 'solid',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  receivableText: {
    fontSize: 16,
    color: "#333",
  },
  receivableAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  insightsContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  selectcontainer: {
    position: "relative",
  },
  // dropdown: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     padding: 10,
  //     borderWidth: 1,
  //     borderColor: '#ccc',
  //     borderRadius: 5,
  //     backgroundColor: '#FFF',
  // },
  // dropdownText: {
  //     flex: 1,
  //     fontSize: 16,
  // },
  optionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    maxHeight: 150,
    zIndex: 99,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    width: 150,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    marginRight: 4,
  },
  insightsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E0E0E0",
    marginHorizontal: 10,
  },
  insightBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "48%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  insightText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#666",
  },
  insightValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  pastOrdersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDetails: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    right: 16,
    top: 16,
  },
  orderStatus: {
    // color: "#00C853",
    fontSize: 14,
    marginTop: 8,
  },
  HorizontalDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  datePickerToggle: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginVertical: 5,
  },
  datePickerToggleText: {
    fontSize: 16,
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
});
export default Payouts;
