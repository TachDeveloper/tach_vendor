import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Datepicker from "react-native-modern-datepicker";
import { getToday } from "react-native-modern-datepicker";
import { useStatus } from "../constants/Context";
import StatusCards from "./HomeContent/StatusCard";
import axios from "axios";
import SwipeCollapseButton from "../components/CustomSwipButton";
import SwipeableBall from "../components/SwipableBall";
import SliderButton from "../components/AcceptSliderButton";
import { Audio } from "expo-av";
import alertMusic from "../assets/audio/alert.mp3";
import { getVendorId } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewOrders } from "../Redux/Slice/NewOrdersSlice";
import { useFocusEffect } from "@react-navigation/native";
import { fetchPickupList } from "../Redux/Slice/PickupListSlice";
const Home = ({ route }) => {
  const [orders, setOrders] = useState([{ items: [] }]);
  const { loading, newOrders } = useSelector((state) => state.newOrders);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(getToday());
  const [newDate, setNewDate] = useState("");
  const { isOnline, swipe, setSwipe } = useStatus();
  const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen
  const { vendorId } = useStatus();
  const [totalSales, setTotalSales] = useState({});
  const [todaySales, setTodaySales] = useState({});
  const [isStatusModal, setIsStatusModal] = useState(null);
  const [isDetailsPage, setIsDetailsPage] = useState(null);
  const [isSwipe, setIsSwipe] = useState(false);
  const [length, setLength] = useState(0);
  const [soundObject, setSoundObject] = useState(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false); // New state to track if the audio is loaded
  const { pickupList } = useSelector((state)=>state.PickupList);
  const dispatch = useDispatch();
  // console.log(newOrders);
  useEffect(() => {
    const loadAudio = async () => {
      const audio = new Audio.Sound();

      try {
        await audio.loadAsync(alertMusic);
        setSoundObject(audio);
        setIsAudioLoaded(true); // Audio is loaded
      } catch (error) {
        console.error("Failed to load audio", error);
      }
    };

    loadAudio();

    return () => {
      if (soundObject !== null) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  const playAudio = async () => {
    try {
      if (soundObject !== null && isAudioLoaded) {
        // Check if audio is loaded
        await soundObject.playAsync();
      }
    } catch (error) {
      console.error("Failed to play audio", error);
    }
  };

  const stopAudio = async () => {
    // console.log(soundObject !== null);
    try {
      if (soundObject !== null) {
        await soundObject.stopAsync();
      }
    } catch (error) {
      console.error("Failed to stop audio", error);
    }
  };

  const fetchOrders = async () => {
    const vendorId = await getVendorId();
    axios
      .get(
        `https://esdy.in/tachapis/vendor-api/get-orders.php?vendor_id=${vendorId}&new_orders_with_items`
      )
      .then((response) => {
        // console.log(response.data, vendorId);

        setOrders(response.data);
        // setIsSwipe(!isSwipe);
        // setSwipe(!swipe);
        // console.log(response.data);
        // console.log(
        //   orders.length >= 1 ? orders.length : orders[0].items.length
        // );
        setError(null); // clear any previous errors
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => {
  //       // Fetch orders only when the modal is not visible
  //       if (!isStatusModal && !isDetailsPage) {
  //         // fetchOrders();
  //         // console.log(orders)
  //         dispatch(fetchNewOrders());
  //       } else if (isSwipe) {
  //         // fetchOrders();
  //         dispatch(fetchNewOrders());
  //         setIsSwipe(!isSwipe);
  //         // console.log(orders)
  //       }
  //       else if (route.name === "Home") {
  //         dispatch(fetchNewOrders());
  //         // setIsDetailsPage(null);
  //         // setIsStatusModal(null);
  //       }
  //     },
  //     isSwipe === true ? 100 : 5000
  //     // 2000
  //   );
  //   // console.log(isSwipe);

  //   // Cleanup function to clear the interval when the component unmounts
  //   // isSwipe ? fetchOrders() : null;
  //   return () => clearInterval(interval);
  // }, [dispatch, isStatusModal, isDetailsPage, isSwipe]); // Add isStatusModal as a dependency

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(
        () => {
          if (
            (!isStatusModal && !isDetailsPage) ||
            isSwipe ||
            route.name === "Home"
          ) {
            dispatch(fetchNewOrders());
            if (isSwipe) {
              setIsSwipe(false);
            }
          }
        },
        isSwipe ? 100 : 5000
      );

      return () => clearInterval(interval); // Cleanup on unfocus or unmount
    }, [dispatch, isStatusModal, isDetailsPage, isSwipe, route.name])
  );

  // useEffect(() => {
  //   // Set up an interval to fetch data every second (1000 ms)
  //   const interval = setInterval(() => {
  //     // Fetch orders only when the modal is not visible
  //     if (!isStatusModal) {
  //       fetchOrders();
  //     } else if (swipe) {
  //       fetchOrders();
  //     }
  //   }, 1000);

  //   // Cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(interval);
  // }, [isStatusModal, swipe]); // Add isStatusModal as a dependency

  // function calculateTotalOrderValue() {
  //   const updatedOrders = Order.map((order) => {
  //     const totalValue = order.OrderItems.reduce(
  //       (acc, item) => acc + item.price,
  //       0
  //     );
  //     return { ...order, OrderValue: totalValue };
  //   });
  //   setOrders(updatedOrders); // Update the state with the calculated order values
  // }

function getTotalSales() {
    axios
      .get(
        `https://esdy.in/tachapis/vendor-api/get-orders.php?vendorid=${vendorId}&fetch_total`
      )
      .then((response) => {
        setTotalSales(response.data[0]);
      });
  }

  function getTodaySales() {
    axios
      .get(
        `https://esdy.in/tachapis/vendor-api/get-orders.php?vendorid=${vendorId}&todays_date=${date.replaceAll(
          "/",
          "-"
        )}&fetch_todays`
      )
      .then((response) => {
        setTodaySales(response.data[0]);
      });
  }

  function handleModal(status) {
    setIsStatusModal(status); // true if the modal is open, false otherwise
  }

  function handleDetailsPage(status) {
    setIsDetailsPage(status);
  }

  const handleAcceptSwipe = (isAccept) => {
    setIsSwipe(!isSwipe);
  };


  
  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          await getTotalSales();
          await getTodaySales();
          dispatch(fetchNewOrders());
          dispatch(fetchPickupList());
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      // Call the async function
      fetchData();
      // Optional cleanup function
      return () => {
        // Any cleanup code here
      };
    }, [dispatch])
  );

  useEffect(() => {
    // Smooth sliding effect when online/offline
    Animated.spring(slideAnim, {
      // toValue: orders.length > 1 ? 0 : orders[0].items.length > 0 ? 0 : 300,
      toValue: isOnline ? 0 : 300,
      friction: 8, // Controls the bounciness
      tension: 40, // Controls the stiffness of the spring
      //   duration: 300,
      useNativeDriver: true,
    }).start();
  }, [orders, slideAnim]);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar barStyle={"dark-content"}></StatusBar>
      {/* <View style={styles.mainSection}>
        <Text style={styles.sales}>Total Sales</Text>
        <View style={styles.SalesContainer}>
          <View style={styles.containers}>
            <Text>ORDERS</Text>
            <Text>{totalSales.total_count ? totalSales.total_count : 0}</Text>
          </View>
          <View style={styles.containers}>
            <Text>SALES</Text>
            <Text>{totalSales.total_sales ? totalSales.total_sales : 0}</Text>
          </View>
        </View>
        <View style={styles.recentBox}>
          <View style={styles.todayContainer}>
            <Text style={styles.sales}>TODAY'S</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ fontSize: 20 }}>{newDate || date}</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Datepicker
                    selected={date}
                    options={{ mainColor: "black" }}
                    style={{ width: 300, height: 300 }}
                    mode="calendar"
                    onDateChange={(selectedDate) => {
                      setNewDate(selectedDate);
                      setDate(selectedDate);
                    }}
                  />
                  <Button
                    title="Close"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.SalesContainer}>
            <View style={styles.containers}>
              <Text>ORDERS</Text>
              <Text>{todaySales?.total_count ? todaySales?.total_count : 0}</Text>
            </View>
            <View style={styles.containers}>
              <Text>SALES</Text>
              <Text>{todaySales?.total_sales ? todaySales?.total_sales : 0}</Text>
            </View>
          </View> */}
      {/* <SwipeCollapseButton /> */}
      {/* <SliderButton/> */}
      {/* <SwipeableBall /> */}
      {/* </View>
      </View> */}

      {newOrders.length <= 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>No Orders</Text>
        </View>
      ) 
      :
      //  loading ? (
      //   <View
      //     style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      //   >
      //     <ActivityIndicator size={"large"} color={"red"} />
      //   </View>
      // ) :
       (
        <Animated.View
          style={[
            styles.statusCardContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <StatusCards
            isAudioLoaded={isAudioLoaded}
            playAudio={playAudio}
            stopAudio={stopAudio}
            Orders={newOrders}
            setStatusModalVisible={handleModal}
            setDetailsPage={handleDetailsPage}
            isAccept={handleAcceptSwipe}
          />

          {/* <StatusCards2
          isAudioLoaded={isAudioLoaded}
          playAudio={playAudio}
          stopAudio={stopAudio}
          Orders={orders}
          setStatusModalVisible={handleModal}
          isAccept={handleAcceptSwipe}
        /> */}
          {/* <BasicSwipeableCard /> */}
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  sales: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainSection: {
    marginTop: 10,
    marginHorizontal: 15,
  },
  SalesContainer: {
    width: "100%",
  },
  containers: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recentBox: {
    marginTop: 20,
  },
  todayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePickerButton: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "gray",
    alignSelf: "flex-start",
    borderRadius: 5,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  statusCardContainer: {
    position: "absolute",
    bottom: 25, // Just above the navbar
    left: 0,
    right: 0,
    paddingHorizontal: 15,
  },
});

export default Home;
