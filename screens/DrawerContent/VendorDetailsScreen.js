import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorData } from '../../Redux/Slice/VendorSlice';

const VendorDetailsScreen = () => {
  const dispatch = useDispatch();
  const { data: vendorData, loading, error } = useSelector((state) => state.vendor);

  useEffect(() => {
    dispatch(fetchVendorData());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{vendorData?.name}</Text>
      <Text style={styles.subtitle}>Vendor Profile</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.text}>Phone: {vendorData?.contact_number}</Text>
        <Text style={styles.text}>Email: {vendorData?.email}</Text>
        <Text style={styles.text}>Address: {vendorData?.address}</Text>
        {vendorData?.website && (
          <TouchableOpacity onPress={() => Linking.openURL(vendorData?.website)}>
            <Text style={styles.link}>Visit Website</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Information</Text>
        <Text style={styles.text}>Type: {vendorData?.business_type}</Text>
        <Text style={styles.text}>GST Number: {vendorData?.gst_no}</Text>
        <Text style={styles.text}>PAN Number: {vendorData?.pan_number}</Text>
        <Text style={styles.text}>Aadhar Number: {vendorData?.aadhar_number}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bank Information</Text>
        <Text style={styles.text}>Bank Name: {vendorData?.bank_name}</Text>
        <Text style={styles.text}>Account Number: {vendorData?.account_number}</Text>
        <Text style={styles.text}>IFSC Code: {vendorData?.ifsc_code}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Details</Text>
        <Text style={styles.text}>Status: {vendorData?.store_status === "1" ? "Active" : "Inactive"}</Text>
        <Text style={styles.text}>Last Login: {vendorData?.last_login}</Text>
        <Text style={styles.text}>Notes: {vendorData?.notes}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Documents</Text>
        <TouchableOpacity onPress={() => Linking.openURL(vendorData?.gst_document)}>
          <Text style={styles.link}>GST Document</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(vendorData?.business_license_document)}>
          <Text style={styles.link}>Business License Document</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#f8f8f8', 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000', // Light teal color for subtitle
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 5,
  },
  text: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  link: {
    fontSize: 15,
    color: '#1A73E8',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 16,
    color: '#D9534F',
  },
});

export default VendorDetailsScreen;

