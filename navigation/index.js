import "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screens/Home";
import Orders from "../screens/DrawerContent/Orders";
import Products from "../screens/DrawerContent/Products";
import Analytics from "../screens/DrawerContent/Analytics";
import Profile from "../screens/DrawerContent/Profile";
import AddProductForm from "../components/AddProductForm";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import MultiStepForm from "../components/MultiStepForm";
import LandingPage from "../screens/LandingPage";
import ToggleSwitchButton from "../components/ToggleButton";
import CustomModal from "../components/CustomModal";
import Navbar from "../components/BottomNavbar/Navbar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Menu from "../screens/Menu/Menu";
import Header from "../components/Header";
import { StatusProvider } from "../constants/Context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import LocationContext from "../constants/LocationContext";
import Payouts from "../screens/Payouts/Payouts";
import OrderDetailsScreen from "../screens/HomeContent/OrderDetails";
import PastOrders from "../screens/DrawerContent/PastOrders";
import More from "../screens/MenuIcon/More";
import VendorDetailsScreen from "../screens/DrawerContent/VendorDetailsScreen";
import OrderScreen from "../screens/DrawerContent/OrderScreen";
import TermsandConditionsMain from "../screens/Terms&Conditions/TermsandConditionsMain";
import PoliciesMain from "../screens/Policies/PoliciesMain";
import PendingOrders from "../screens/DrawerContent/PendingOrders";




export default function Navigation({ colorScheme }) {
  return (
    <StatusProvider>
      {/* <LocationContext> */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <RootNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      {/* </LocationContext> */}
    </StatusProvider>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <Navbar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        header: () => (
          <View style={{ position: "relative", backgroundColor: "#fff" }}>
            <Header />
          </View>
        ),
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="PendingOrders" component={PendingOrders} />
      <Tab.Screen name="Orders" component={PastOrders} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Payouts" component={Payouts} />
      <Tab.Screen name="More" component={More} />
      <Tab.Screen name="VendorDetailsScreen" component={VendorDetailsScreen} />
      <Tab.Screen name="OrderScreen" component={OrderScreen} />
     

      {/* <Tab.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} /> */}
      {/* <Tab.Screen name="Products" component={Products} /> */}
    </Tab.Navigator>
  );
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Orders" component={PastOrders} />
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Analytics" component={Analytics} />
   
      {/* <Drawer.Screen name="Profile" component={Profile} /> */}
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Tab" component={MyTabs} />
      {/* <Stack.Screen name="AddProductFormStack" component={AddProductFormStack} /> */}
      <Stack.Screen name="AddProductForm" component={AddProductForm} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MultiStepForm" component={MultiStepForm} />
      <Stack.Screen name="ToggleSwitchButton" component={ToggleSwitchButton} />
      <Stack.Screen name="CustomModal" component={CustomModal} />
      <Stack.Screen name="Navbar" component={Navbar} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="TermsConditions" component={TermsandConditionsMain} />
      <Stack.Screen name="Policies" component={PoliciesMain} />
      
     

     
  
      {/* <Stack.Screen name="Menu" component={MenuMain} /> */}
    </Stack.Navigator>
  );
}
