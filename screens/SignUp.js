import React, { useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SignUp = () => {
  const [number, setNumber] = useState("");
  const [verify, setVerify] = useState(true);
  const [otpInput, setOtpInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigation = useNavigation();
  const SkipLogin = () => {
    navigation.navigate("Login");
  };
  useFocusEffect(
    React.useCallback(() => {
      setNumber("");
      setOtp("");
      setVerify(true);

      return () => {
        // console.log("Screen is unfocused");
        setErrorMsg("");
        setOtp("");
        setOtpInput("");
      };
    }, [])
  );

  const verifyNumber = async () => {
    let data = {
      country_code: "+91",
      phone: number,
    };
    setOtpInput(OTPGenerator());
    // try {
    //   const response = await axios.post(
    //     "https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/Vendorsignupgenerateotp",
    //     data
    //   );
    //   if (response.data.status === "Success!") {
    //     console.log("phone number verifying");
    //     setOtpInput(response.data.data.otp);
    //     setToken(response.data.data.token);
    //     console.log(response.data.data);
    //   }
    //   if (response.data.status === "Not Found") {
    //     console.log(response.data.message);
    //     setErrorMsg(response.data.message);
    //   }
    //   console.log(response.data);
    // } catch (error) {
    //   console.log("Phone Number Verifying Failed", error);
    // }
  };
  const verifyOtp = async () => {
    // console.log(number, typeof parseInt(otp.join("")), token);
    let data = {
      country_code: "+91",
      phone: parseInt(number),
      otp: parseInt(otp.join("")),
    };
    navigation.navigate("Tab");
    // console.log(data);
    // setIsLoading(true);

    // try {
    //   const response = await axios.post(
    //     "https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/VendorLogin",
    //     data,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   if (response.data.status === "Success Login!") {
    //     const storeData = async () => {
    //       try {
    //         await AsyncStorage.setItem("UserId", response.data.data._id);
    //         await AsyncStorage.setItem("name", response.data.data.Name);
    //         console.log("Data stored successfully!");
    //       } catch (error) {
    //         console.log("Error storing data:", error);
    //       }
    //     };
    //     storeData();
    //     console.log("otp number verifying");

    //     console.log(response.data.data);
        //  navigation.navigate("MultiStepForm");
    //   }
    // } catch (error) {
    //   console.log("otp Verifying Failed", error);
    // } finally {
    //   setIsLoading(false);
    // }
    // setIsLoading(false);
  };

  const OTPGenerator = () => {
    let newOtp = [];
    for (let i = 0; i < 4; i++) {
      newOtp.push(Math.floor(Math.random() * 10));
    }
    const otpString = newOtp.join("");
    // console.log(otpString);
    return otpString;
  };

  return (
    <>
      <ImageBackground
        // source={{ uri: "https://i.ibb.co/6YmkTBy/login-bg.jp" }}
        style={styles.backgroundImage}
      >
        <SafeAreaView>
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                width: 100,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.3)",
                padding: 10,
                position: "absolute",
                right: 20,
                top: 60,
              }}
              onPress={SkipLogin}
            >
              <View>
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 50 }}>
              <Text style={{ fontSize: 70, color: "#fff" }}>Sign Up.</Text>
            </View>
            {/* <Text>{otpInput}</Text> */}

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 30, color: "#fff" }}>
                Your Everyday Market,{"\n"} One Tap Away
              </Text>
            </View>
            {verify ? (
              <View style={{ height: 100 }}>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 30,
                    padding: 10,
                    marginTop: 50,
                    height: 50,
                    position: "relative",
                  }}
                >
                  <View style={{ position: "absolute", top: 16, left: 15 }}>
                    <Text style={{ fontSize: 16 }}>+91</Text>
                  </View>
                  <View
                    style={{
                      width: "90%",
                      position: "absolute",
                      left: 50,
                      top: 16,
                    }}
                  >
                    <TextInput
                      style={{ fontSize: 18, marginTop: -5 }}
                      placeholder="Enter your mobile number"
                      placeholderTextColor="#808080"
                      value={number}
                      onChangeText={(text) => setNumber(text)}
                      maxLength={10}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (number.length === 10) {
                      verifyNumber();
                      setVerify(false);
                      // console.log("verified");
                    }
                  }}
                >
                  <View
                    style={{
                      marginTop: 40,
                      width: "100%",
                      backgroundColor: "#fff",
                      padding: 10,
                      borderRadius: 30,
                      height: 50,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        marginTop: 3.5,
                      }}
                    >
                      {/* {verify ?Continue :}   */}
                      Register
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                  }}
                >
                  <CustomOTPInput
                    numberOfInputs={4}
                    otp={otp}
                    setOtp={setOtp}
                  ></CustomOTPInput>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // console.log(typeof otp.join(""), typeof otpInput);
                    // if (otp.join("") == otpInput) {
                    //   verifyOtp();
                    // }
                    verifyOtp();
                    // console.log(otp.join(""));
                  }}
                >
                  <View
                    style={{
                      marginTop: 40,
                      width: "100%",
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 30,
                      height: 50,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",

                        fontSize: 18,
                        marginTop: 3.5,
                      }}
                    >
                      {isLoading ? (
                        <ActivityIndicator></ActivityIndicator>
                      ) : (
                        "Verify"
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
                {errorMsg && (
                  <Text style={{ color: "#fff", padding: 10 }}>
                    {errorMsg + "Please Signup"}
                  </Text>
                )}
              </View>
            )}
          </View>
        </SafeAreaView>
        <View
          style={{ position: "absolute", width: "100%", bottom: 50, left: 0 }}
        >
          <Text style={{ color: "#fff", textAlign: "center", lineHeight: 22 }}>
            By Continuing, you agree to our {"\n"} Terms of Use & Privacy Policy
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    color: "#fff",
  },

  borderStyleHighLighted: {
    // borderColor: "#03DAC6",
    color: "#fff",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 5,

    fontSize: 20,
    // fontWeight:800
  },

  underlineStyleHighLighted: {
    color: "#fff",
    fontSize: 20,
    borderColor: "#fff",
    // fontWeight:800
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "#ec1135",
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  container: {
    padding: 20,
    paddingTop: 50,
  },
  input: {
    borderWidth: 2,
    borderColor: "#fff",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
});
const CustomOTPInput = ({ numberOfInputs = 4, otp, setOtp }) => {
  const inputRefs = useRef([]);

  const handleInput = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== "" && index < numberOfInputs - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0) {
      let newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {Array(numberOfInputs)
        .fill()
        .map((_, index) => (
          <TextInput
            key={index}
            style={styles.input}
            maxLength={1}
            // placeholder="0"
            keyboardType="numeric"
            selectionColor={"#fff"}
            value={otp[index]}
            onChangeText={(text) => handleInput(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
    </View>
  );
};
export default SignUp;
