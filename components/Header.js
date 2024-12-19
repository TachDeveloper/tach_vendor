import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useState } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { useStatus } from "../constants/Context";
import { SafeAreaView } from "react-native-safe-area-context";
import ToggleSwitchButton from "./ToggleButton";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import { removeVendorId } from "../utils/utils";

const Header = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const { isOnline } = useStatus();
  const { setSearch } = useStatus();

  const navigationState = useNavigationState((state) => state); // Get the active navigation state
  const { index } = navigationState;
  const activeRouteName = navigationState.routeNames?.[index];

  // Function to check if a tab is active
  const isActive = (screenName) => activeRouteName === screenName;
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#fff" style="dark" />
      <View style={styles.header}>
        <View style={styles.bar}>
          <ToggleSwitchButton />
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              disabled={!isActive("Menu")}
              style={styles.iconButton}
              onPress={() => setSearch((prevState) => !prevState)}
            >
              {isActive("Menu") && (
                <AntDesign style={{ paddingTop: 2 }} name="search1" size={20} />
              )}
            </TouchableOpacity>

            <TouchableOpacity>
              <Feather name="menu" onPress={()=>navigation.navigate("More")}  size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await removeVendorId();
                navigation.navigate("Login");
              }}
            >
              {/* <SimpleLineIcons name="logout" size={24} color="black" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Custom Modal */}
      <CustomModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title={title}
        options={options}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingEnd: 10,
  },
  iconButton: {
    padding: 8,
  },
});

export default React.memo(Header);

// import { useNavigation } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
// import { Image,  StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import IIcon from "react-native-vector-icons/Ionicons";
// import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

// const Header = () => {
//     var navigation = useNavigation();
//     return(

//  <SafeAreaView >
//     <StatusBar  backgroundColor="#000"></StatusBar>
//             <View style={styles.header}>
//                 <View style={styles.bar}>
//                     <TouchableOpacity onPress={()=> navigation.toggleDrawer()} >
//                         <MIcon name="microsoft-xbox-controller-menu" style={styles.menuicon} color={"white"} size={48} />
//                     </TouchableOpacity>
//                     {/* <Text style={styles.title}>TACH</Text> */}
//                     <Image source={require("../assets/images/logo-red-bg.png")} style={{height:"95%", width: "27%"}} />
//                     <TouchableOpacity onPress={()=> navigation.navigate("Profile")} >
//                         <IIcon name="person-circle" color={"white"} size={48} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>

//     )
// }

// const styles = StyleSheet.create({
//     header: {
//         backgroundColor : "#ec1135"
//     },
//     bar: {
//         // marginTop: 30,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 8,
//         // paddingVertical: 10,
//         // paddingStart: 5
//     },
//     title: {
//         color: "white",
//         fontSize: 25,
//         fontWeight: "900",
//         // marginStart: 10
//     },
//     menuContainer: {
//         flexDirection: "row",
//         // alignItems: "center",
//     },
//     // menuicon : {
//     //     backgroundColor: "white"
//     // }
// })

// export default Header;
