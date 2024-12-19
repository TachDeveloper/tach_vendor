import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { Ionicons } from "react-native-vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ title, search, navigationPath }) => {
  const navigation = useNavigation()
  return (
    <SafeAreaView edges={["top"]} style={{backgroundColor: "#fff"}}>
      <StatusBar style="dark" backgroundColor="#fff"></StatusBar>
      <View style={styles.flexRow}>
        <TouchableOpacity
          onPress={() => {
          navigation.goBack()
          }}
        >
          <Ionicons
            name="chevron-back"
            color={Colors.gray}
            size={30}
          ></Ionicons>
        </TouchableOpacity>
        <Text style={[styles.text, { fontSize: 16 }]}>{title}</Text>
        <TouchableOpacity onPress={()=>navigate("Search")}>
          {search && (
            <Ionicons name="search" color={Colors.gray} size={30}></Ionicons>
          )}
        </TouchableOpacity>
      </View>
   </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: "space-between",
    padding: 10,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },
  text: {
    textAlign: "center",
  },
});
