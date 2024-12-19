import React, { useEffect, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import LoginWithPassword from "../components/LoginWithPassword";
import LoginWithOtp from "../components/LoginWithOtp";

const Login = () => {
  const [isPassword, setIsPassword] = useState(false);
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  console.log("Entering useFocusEffect in MyComponent");
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log("Screen is unfocused");
      };
    }, [])
  );
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: "#ec1135" }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ marginTop: 40 }}
          >
            <SafeAreaView>
              <View style={styles.container}>
                {/* <TouchableOpacity
                  style={styles.signUp}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  <Text style={styles.signUpText}>Sign Up</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity
                  style={styles.skip}
                  onPress={() => navigation.navigate("Tab")}
                >
                  <Text style={styles.signUpText}>Skip Login</Text>
                </TouchableOpacity> */}
                <View
                  style={{
                    marginTop: 80,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Image source={require("../assets/images/logo-red-bg.png")} />
                </View>
                <View style={{ marginTop: 50 }}>
                  <Text
                    style={{ fontSize: 25, color: "#fff", textAlign: "center" }}
                  >
                    Your Everyday Market,{"\n"} One Tap Away
                  </Text>
                </View>

                {isPassword ? (
                  <LoginWithPassword />
                ) : (
                  <LoginWithOtp navigation={navigation} />
                )}
                {/* <TouchableOpacity style={{alignSelf:"center"}} onPress={() => setIsPassword(!isPassword)}>
                  <View style={styles.loginWithContainer}>
                    <Text style={styles.loginWithText}>
                      {isPassword ? "Login with Number" : "Login with Email"}
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
        {!keyboardVisible && (
          <View
            style={{ position: "absolute", width: "100%", bottom: 50, left: 0 }}
          >
            <Text
              style={{ color: "#fff", textAlign: "center", lineHeight: 22 }}
            >
              By Continuing, you agree to our {"\n"} Terms of Use & Privacy
              Policy
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    color: "#fff",
  },

  borderStyleHighLighted: {
    color: "#fff",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 5,

    fontSize: 20,
  },
  signUp: {
    width: 100,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 10,
    position: "absolute",
    right: 20,
    top: 20,
  },
  signUpText: { textAlign: "center", color: "#fff" },
  loginWithContainer: {
    marginTop: 40,
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 30,
    height: 50,
  },
  loginWithText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 3.5,
  },
  underlineStyleHighLighted: {
    color: "#fff",
    fontSize: 20,
    borderColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "#940811",
    resizeMode: "cover", // or 'stretch' or 'contain'
  },
  container: {
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    marginTop: 40,
    width: "100%",
  },
  textInput: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    fontSize: 16,
    color: "#000",
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#000",
    fontSize: 18,
  },
});

export default Login;
