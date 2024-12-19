import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const CustomSubHeader = ({ routeName, name }) => {
  const navigation = useNavigation();

  return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingHorizontal: 10,
          paddingVertical: name === "Order Details" ? 10 : 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
          <FontAwesome name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              marginLeft: name === "Order Details" ? "29%" : "0%",
              // flex: 1,
            }}
          >
            {name}
          </Text>
        </View>
        {name === "Order Details" ? (
          <TouchableOpacity style={styles.callSupportButton}>
            <AntDesign name="customerservice" color={"#FF7043"} size={20} />
            <Text style={styles.callSupportText}>Call Support</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  callSupportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    // backgroundColor: "#FF7043",
    backgroundColor: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF7043",
  },
  callSupportText: {
    color: "#FF7043",
    fontWeight: "",
    fontSize: 12,
    marginLeft: 2,
  },
});

export default CustomSubHeader;
