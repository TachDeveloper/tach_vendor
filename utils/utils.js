import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";

export const getVendorId = async () => {
  try {
    const vendorId = await AsyncStorage.getItem("VendorId");
    return vendorId;
  } catch (error) {
    console.log("Failed to get VendorId", error);
    return null;
  }
};

export const removeVendorId = async () => {
  try {
    const vendorId = await AsyncStorage.getItem("VendorId");

    if (vendorId !== null) {
      await AsyncStorage.removeItem("VendorId");
      console.log("VendorId removed successfully");
    } else {
      console.log("No VendorId found in storage");
    }
  } catch (error) {
    console.log("Error occurred while removing VendorId", error);
  }
};

export const handleCallPress = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};