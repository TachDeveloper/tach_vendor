import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import { removeVendorId } from "../../utils/utils";
import { resetPastOrders } from '../../Redux/Slice/PastOrderSlice'



const More = () => {

  const navigation = useNavigation();

  return (
    <ScrollView style={{}} >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("VendorDetailsScreen")}
      >
        <Text style={styles.menuText}>Manage Profile </Text>
        <AntDesign name="right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Orders")}
      >
        <Text style={styles.menuText}>Past Orders </Text>
        <AntDesign name="right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("TermsConditions")}
      >
        <Text style={styles.menuText}>Terms and Conditions </Text>
        <AntDesign name="right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Policies")}
      >
        <Text style={styles.menuText}>Policies </Text>
        <AntDesign name="right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await removeVendorId();
          resetPastOrders();
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default More

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
  },
  menuText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    marginHorizontal: 8,
    backgroundColor: "#f44336",
    borderRadius: 5,
    marginBottom: 20,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
})