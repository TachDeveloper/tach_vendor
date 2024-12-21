import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  AsyncStorage,
  Dimensions,
  ImageBackground,
} from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Image } from "react-native";
import { getVendorId } from "../utils/utils";
const { width, height } = Dimensions.get("window");
const LandingPage = () => {
  const navigation = useNavigation();
  const handleSignInPress = async () => {
    if (await getVendorId()) {
      navigation.navigate("Tab");
    } else {
      navigation.navigate("Login");
    }
  };

  const skipLogin = () => {
    navigation.navigate("Tab");
  };

  return (
    <>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        slidesPerView="1"
        mousewheel={true}
        showsPagination={true}
        paginationStyle={{ bottom: "26%" }}
      >
        {/* <ImageBackground
            source={{ uri: "https://tach21.in/admin/dashboard/uploads/1698440135.webp"}}
          style={styles.slide}
        ></ImageBackground>
        <ImageBackground
          source={{uri: "https://tach21.in/admin/dashboard/uploads/1698440143.webp"}}
          style={styles.slide}
        ></ImageBackground>
        <ImageBackground
          source={{uri: "https://tach21.in/admin/dashboard/uploads/1698440151.webp"}}
          style={styles.slide}
        ></ImageBackground> */}
        <Image
          style={styles.logo}
          source={require("../assets/images/logo-red-bg.png")}
        />
      </Swiper>

      <View style={styles.fixedView}>
        <TouchableOpacity onPress={handleSignInPress}>
          <View
            style={{
              width: "80%",
              marginLeft: "10%",
              borderRadius: 10,
              backgroundColor: "#ec1135",
              padding: 10,
              textAlign: "center",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 18,
                marginRight: 10,
              }}
            >
              Get Started
            </Text>
            <Icon name="arrow-right" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleSignInPress}>
          <Text style={{ textAlign: "center", marginTop: 10 }}>Login</Text>
        </TouchableOpacity> */}
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            color: "#d3d3d3",
            fontSize: 14,
          }}
        >
          By continuing, you agree to our terms & conditions
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    // width: width,
    // Other styles for the Swiper container if needed
    backgroundColor: "#ec1135",
  },
  slide: {
    width: width, // Full width of the device
    height: height, // Full height of the device
    justifyContent: "center", // You can adjust the content alignment if needed
    alignItems: "center", // You can adjust the content alignment if needed
  },
  fixedView: {
    width: "100%",
    height: "25%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: "16%",
  },
  logo: {
    alignSelf: "center",
    marginTop: 300,
    width: "75%",
    height: "15%",
  },
});

export default LandingPage;
