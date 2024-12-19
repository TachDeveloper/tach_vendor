import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IIcon from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";

const Header2 = ({routes}) => {
    var navigation = useNavigation();
    return(
        <SafeAreaView>
            <StatusBar  backgroundColor="#000"></StatusBar>
            <View style={styles.header}>
                <View style={styles.bar}>
                    {/* <TouchableOpacity onPress={()=> navigation.toggleDrawer()} >
                        <MIcon name="microsoft-xbox-controller-menu" style={styles.menuicon} color={"white"} size={48} />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={()=> navigation.navigate(routes)} >
                        <IIcon name="arrow-back" style={styles.menuicon} color={"white"} size={30} />
                    </TouchableOpacity>
                    {/* <Text style={styles.title}>TACH</Text> */}
                    <Image source={require("../assets/images/logo-red-bg.png")} style={{height:"95%", width: "27%"}} />
                    <TouchableOpacity onPress={()=> navigation.navigate("Profile")} >
                        <IIcon name="person-circle" color={"white"} size={48} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )  
}

const styles = StyleSheet.create({
    header: {
        backgroundColor : "#ec1135"
    },
    bar: {
        // marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 8,
        // paddingVertical: 10,
        // paddingStart: 5
    },
    title: {
        color: "white",
        fontSize: 25,
        fontWeight: "900",
        // marginStart: 10
    },
    menuContainer: {
        flexDirection: "row",
        // alignItems: "center",
    },
    // menuicon : {
    //     backgroundColor: "white"
    // }
})


export default Header2;