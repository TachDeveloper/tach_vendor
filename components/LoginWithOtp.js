import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomOTPInput from "./CustomOTPInput";

const LoginWithOtp = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [vendorId, setVendorId] = useState(null);
  const [otpInput, setOtpInput] = useState("");
  const [verify, setVerify] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [otp, setOtp] = useState();
  // const OTP = OTPGenerator();
  // const [token, setToken] = useState("");

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
  useEffect(() => {
    setErrorMsg("");
  }, [number]);

  const verifyNumber = async () => {
    const data = {
      country_code: "+91",
      phone: number,
    };
    // setIsLoading(true);
    setErrorMsg("");
    // setOtp(OTPGenerator());
    // setOtpInput(otp);
    // setIsLoading(false);
    // console.log(otp);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://tach21.com/tachapis/vendor-api/login-with-mobile.php?mobile=${number}&check`
      );
      if (response.data.status === "success") {
        // console.log("phone number verifyied");
        // setOtpInput(response.data.data.otp);
        setVendorId(response.data.vendor_id);
        // console.log(response.data.vendor_id);
        await AsyncStorage.setItem(
          "VendorId",
          response.data.vendor_id.toString()
        );
        // setToken(response.data.data.token);
        // console.log(response.data.data.token);
        // console.log(response.data.data);

        // setOtp(OTPGenerator);
        // setOtpInput(otp);
        return true;
      }
      if (response.data.status === "invalid") {
        setErrorMsg("Invalid Number");
        return false;
      }
      // if (response.data.status === "Not Found") {
      //   console.log(response.data.message);
      //   setErrorMsg(response.data.message);
      // }
      // console.log(response.data);
    } catch (error) {
      console.log("Phone Number Verifying Failed", error);
    } finally {
      setIsLoading(false);
    }
    // return true;
  };

  const verifyOtp = () => {
    const data = {
      country_code: "+91",
      phone: parseInt(number),
      otp: otp,
    };
    setIsLoading(true);
    axios
      .get(
        `https://tach21.com/tachapis/vendor-api/login-with-mobile.php?mobile=${number}&otp=${otpInput}&check`
      )
      .then((response) => {
        // console.log(response);
        if (response.data.status === "success" && otpInput.length > 3) {
          navigation.navigate("Tab");
        } else {
          setErrorMsg("Invalid OTP");
        }
      });
    setIsLoading(false);

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
    //   }
    // } catch (error) {
    //   console.log("otp Verifying Failed", error);
    // } finally {
    //   setIsLoading(false);
    // }
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

  return verify ? (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.countryCodeContainer}>
          <Text style={styles.countryCodeText}>+91</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your mobile number"
            placeholderTextColor="#808080"
            value={number}
            onChangeText={(text) => setNumber(text)}
            maxLength={10}
            keyboardType="numeric"
          />
        </View>
      </View>
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      <TouchableOpacity
        onPress={async () => {
          if (number.length === 10) {
            if (await verifyNumber()) {
              setVerify(false);
            }
          } else {
            setErrorMsg("Number is Invalid");
          }
        }}
      >
        <View style={styles.continueButton}>
          <Text style={styles.buttonText}>
            {isLoading ? <ActivityIndicator /> : "Continue"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      <View style={styles.otpContainer}>
        {/* <Text style={styles.otpText}>{otp}</Text> */}
        <CustomOTPInput
          numberOfInputs={4}
          otp={otpInput}
          setOtp={setOtpInput}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          // if (otp.length > 0) {
          // console.log(otp);
          // console.log(otpInput);
          // if (otp === otpInput.join("")) {
          //   verifyOtp();
          // } else {
          //   setErrorMsg("Invalid OTP");
          // }
          verifyOtp();
          // }
        }}
      >
        <View style={styles.verifyButton}>
          <Text style={styles.buttonText}>
            {isLoading ? <ActivityIndicator /> : "Verify"}
          </Text>
        </View>
      </TouchableOpacity>
      {errorMsg && (
        <Text style={styles.errorText}>{errorMsg} Please Signup</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    marginTop: 50,
    height: 50,
    position: "relative",
  },
  countryCodeContainer: {
    position: "absolute",
    top: 16,
    left: 15,
  },
  countryCodeText: {
    fontSize: 16,
    marginTop: -2,
  },
  textInputContainer: {
    width: "90%",
    position: "absolute",
    left: 50,
    top: "35%",
  },
  textInput: {
    fontSize: 18,
    // marginTop: -5,
  },
  continueButton: {
    marginTop: 40,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    height: 50,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 3.5,
  },
  errorText: {
    color: "#fff",
    padding: 10,
  },
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  otpText: {
    color: "#fff",
  },
  verifyButton: {
    marginTop: 40,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    height: 50,
  },
});

export default LoginWithOtp;
