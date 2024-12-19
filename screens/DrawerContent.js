import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { FontAwesome } from "react-native-vector-icons";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerContent = (props) => {
    var navigation = useNavigation();
    return (
        <View
            style={{
            flex: 1,
            justifyContent: "space-between",
            padding: 20,
            }}
        >
            <DrawerContentScrollView {...props}>
            <View style={{}}>
                <View>
                <FontAwesome size={100} name={"user-circle-o"}></FontAwesome>
                <Text style={{ fontWeight: 800, paddingVertical: 30 }}>
                    Welcome
                </Text>
                <TouchableOpacity
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{ fontSize: 20 }}>Home</Text>
                    <AntDesign size={30} name={"right"}></AntDesign>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                    }}
                    onPress={() => navigation.navigate("Orders")}
                >
                    <Text style={{ fontSize: 20 }}>Orders</Text>
                    <AntDesign size={30} name={"right"}></AntDesign>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                    }}
                    // onPress={() => navigation.navigate("Products")}
                >
                    <Text style={{ fontSize: 20 }}>Products</Text>
                    <AntDesign size={30} name={"right"}></AntDesign>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                    }}
                    // onPress={() => navigation.navigate("SubscriptionScreen")}
                >
                    <Text style={{ fontSize: 20 }}>Subscription</Text>
                    <AntDesign size={30} name={"right"}></AntDesign>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                    }}
                    // onPress={() => navigation.navigate("Analytics")}
                >
                    <Text style={{ fontSize: 20 }}>Analytics</Text>
                    <AntDesign size={30} name={"right"}></AntDesign>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                    }}
                    // onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={{ fontSize: 20 }}>Profile</Text>
                    <AntDesign size={30} name={"right"}></AntDesign>
                </TouchableOpacity>
                
                {/* {!userId && (
                    <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingBottom: 10,
                    }}
                    // onPress={() => navigation.navigate("Login")}
                    >
                    <Text style={{ fontSize: 20 }}>Login</Text>
                    <AntDesign size={30} name={"right"}></AntDesign>
                    </TouchableOpacity>
                )} */}
                </View>
            </View>
            </DrawerContentScrollView>
            <TouchableOpacity
            // onPress={async () => {
            //     try {
            //     navigation.toggleDrawer();
            //     navigation.navigate("Landing");
            //     await AsyncStorage.clear();
            //     } catch (error) {
            //     console.log(error);
            //     }
            // }}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 20,
            }}
            >
            <Text style={{ fontSize: 20, marginRight: 20 }}>Logout</Text>
            <MaterialCommunityIcons
                size={30}
                name={"logout"}
            ></MaterialCommunityIcons>
            </TouchableOpacity>
        </View>     
    )
}

export default DrawerContent;