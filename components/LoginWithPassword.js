import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios"; // Import Axios for making HTTP requests
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const LoginWithPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // console.log("Login is unfocused");
        setEmail("");
        setErrorMsg("");
        setPassword("");
        setPasswordVisible(true);
      };
    }, [])
  );

  const handleLogin = async () => {
    try {
      if (email && password) {
        setIsLoading(true);
        // const apiUrl =
        //   "https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/loginwithpassword"; 
        const payload = {
          email: email,
          password: password,
        };
        navigation.navigate("Tab");
        // const response = await axios.post(apiUrl, payload);
        //console.log(response.data.status);
        // if (response.data.status === "Success!") {
        //   console.log("login Successfull");
        //   try {
        //     await AsyncStorage.setItem("UserId", response.data.data._id);
        //     await AsyncStorage.setItem("name", response.data.data.Name);
        //     navigation.navigate("Home");
        //     console.log("Data stored successfully!");
        //   } catch (error) {
        //     console.log("Error storing data:", error);
        //   }
        // }
      //   if (response.data.status === "Failed") {
      //     setErrorMsg("Invalid email or password");
      //   }
      //   if (response.data.status === "Not Registered") {
      //     setErrorMsg("User not registered , please registered");
      //   }
      // } else {
      //   setErrorMsg("Please enter email and password");
       }
    } catch (error) {
      setErrorMsg("SomeThing Went Wrong")
      console.log("Login With Email and Password  error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { marginBottom: 20 }]}
        placeholder="Enter Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrorMsg("");
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter Password"
          secureTextEntry={passwordVisible}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMsg("");
          }}
        />
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => setPasswordVisible((prev) => !prev)}
        >
          <Icon
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {errMsg && <Text style={{color:"#fff"}}>{errMsg}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default LoginWithPassword;
