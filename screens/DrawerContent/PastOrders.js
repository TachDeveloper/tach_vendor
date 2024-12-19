import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchPastOrders } from "../../Redux/Slice/PastOrderSlice";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomSubHeader from "../../components/CustomSubHeader";

const staticOrders = [
    {
        order_id: 1,
        total_price: 500,
        total_items: 2,
        order_date_time: "2024-10-01",
        delivery_status: "1",
    },
    {
        order_id: 2,
        total_price: 750,
        total_items: 1,
        order_date_time: "2024-10-05",
        delivery_status: "0",
    },
    {
        order_id: 3,
        total_price: 300,
        total_items: 3,
        order_date_time: "2024-10-15",
        delivery_status: "1",
    },
    {
        order_id: 4,
        total_price: 1200,
        total_items: 4,
        order_date_time: "2024-10-20",
        delivery_status: "0",
    },
];

const filterOptions = [
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

const PastOrders = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [customRangeModalVisible, setCustomRangeModalVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("This Week");
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isStartDate, setIsStartDate] = useState(true); // Toggle between start and end date
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const { loading, pastOrders, error } = useSelector(
        (state) => state.pastOrders
    );
    // console.log(pastOrders.orders);

    useEffect(() => {
        dispatch(fetchPastOrders(selectedFilter));
    }, [dispatch ]);

    const updateFilter = () => {
        let filter = { dateFilter: selectedFilter };
        if (selectedFilter === "Custom Range") {
            filter = {
                ...filter,
                customRange: {
                    startDate: startDate.toLocaleDateString(),
                    endDate: endDate.toLocaleDateString(),
                },
            };
        }
        dispatch(fetchPastOrders(filter));
    };

    useEffect(() => {
        if (selectedFilter !== "Custom Range") {
            updateFilter();
        }
    }, [selectedFilter]);

    // const combinedOrders = [...staticOrders];

    const openDropdown = () => {
        setModalVisible(true);
    };

    const closeDropdown = () => {
        setModalVisible(false);
    };

    const handleOptionSelect = (option) => {
        setSelectedFilter(option);
        if (option === "Custom Range") {
            setCustomRangeModalVisible(true); // Show custom range modal
        } else {
            setCustomRangeModalVisible(false); // Hide custom range modal
        }
        closeDropdown();
    };

    const onChangeDate = (event, selectedDate) => {
        if (event.type === "dismissed") {
            setShowDatePicker(false); // Close the date picker if dismissed
            return;
        }

        if (isStartDate) {
            setStartDate(selectedDate || startDate); // Set the start date
        } else {
            setEndDate(selectedDate || endDate); // Set the end date
        }
        setShowDatePicker(false); // Close date picker after selection
    };

    const toggleDatePicker = (isStart) => {
        setIsStartDate(isStart);
        setShowDatePicker(true);
    };

    const renderOrder = ({ item }) => (
        <View style={styles.orderContainer}>
            <TouchableOpacity onPress={()=>navigation.navigate("OrderScreen",{data:item.order_id})}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order Id #{item.order_id}</Text>
                <Text style={styles.orderTotal}>₹{item.total_price}</Text>
            </View>
            <Text style={styles.orderItems}>
                {item.total_items} Items | {item.order_date_time}
            </Text>
          </TouchableOpacity>
            <View style={styles.separator} />
            <Text
                style={[
                    styles.orderStatus,
                    item.delivery_status === "1" ? styles.delivered : styles.rejected,
                ]}
            >
                {item.delivery_status === "1" ? "Delivered" : "Rejected"}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                    <Text style={styles.headerTitle}>Past Orders</Text>
                </View>
            </TouchableOpacity> */}

            {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backButton}>
            <FontAwesome
              name="chevron-left"
              size={24}
              color="black"
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Past Orders</Text>
        <View style={{ width: 24 }} />
      </View> */}

            <CustomSubHeader name={"Orders"} routeName={"Home"} />

            <View style={styles.container2}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Range</Text>
                    <TouchableOpacity style={styles.dropdown} onPress={openDropdown}>
                        <Text style={styles.dropdownText}>{selectedFilter}</Text>
                        <Ionicons
                            name="chevron-down"
                            size={16}
                            color="#333"
                            style={styles.dropdownIcon}
                        />
                    </TouchableOpacity>
                </View>

                <Modal transparent visible={modalVisible} animationType="none">
                    <TouchableOpacity style={styles.modalOverlay} onPress={closeDropdown}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                onPress={closeDropdown}
                                style={styles.closeIcon}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                            {filterOptions.map((option) => (
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

                <Modal
                    transparent
                    visible={customRangeModalVisible}
                    animationType="none"
                >
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
                                    setCustomRangeModalVisible(false);
                                    updateFilter();
                                }} // Close the custom range modal after selection
                            >
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                {loading ? (
                    <View
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <ActivityIndicator size={"large"} />
                    </View>
                ) : pastOrders?.orders?.length < 1 ? (
                    <View
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <Text style={{ color: "red" }}>No past orders for {selectedFilter}</Text>
                    </View>
                ) : (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={pastOrders.orders}
                        renderItem={renderOrder}
                        keyExtractor={(item) => item.order_id}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        // marginLeft: 8,
        width: "86%",
        textAlign: "center",
    },
    container2: {
        padding: 20,
        flex: 1,
    },
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        justifyContent: "space-between",
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginRight: 10,
    },
    dropdown: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    dropdownText: {
        fontSize: 16,
        color: "#333",
    },
    dropdownIcon: {
        marginLeft: 5,
    },
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
    listContainer: {
        paddingBottom: 20,
    },
    orderContainer: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    orderHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    orderId: {
        fontSize: 16,
        fontWeight: "bold",
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    orderItems: {
        fontSize: 14,
        marginVertical: 5,
    },
    separator: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 10,
    },
    orderStatus: {
        fontSize: 14,
        fontWeight: "bold",
    },
    delivered: {
        color: "green",
    },
    rejected: {
        color: "red",
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

export default PastOrders;
