import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import * as Location from 'expo-location';

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState();
  const [search, setSearch] = useState(false);
  const [vendorId, setVendorId] = useState(0);
  const [swipe, setSwipe] = useState(false);
  const [LiveAddress, setLiveAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  async function GetVendor() {
    const vendorId = await AsyncStorage.getItem("VendorId");
    setVendorId(vendorId);
    axios
      .get(
        `https://tach21.in/tachapis/vendor-api/user-details.php?vendor_id=${vendorId}&get_vendor_details`
      )
      .then((response) => {
        setIsOnline(parseInt(response.data.store_status));
        // if(response.data.store_status==="0") {
        //   setIsOnline(false);
        // } else {
        //   setIsOnline(true)
        // }
      });
  }

  useEffect(() => {
    GetVendor();
  }, [vendorId]);


  useEffect(() => {
    const fetchLocationAndAddress = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        fetchAddress(location.coords.latitude, location.coords.longitude);
        
      } catch (error) {
        setErrorMsg('Error fetching location');
      }
    };

    fetchLocationAndAddress();
  }, []);

  const fetchAddress = async (latitude, longitude) => {
    const apiKey = 'AIzaSyCegXjiZNf9iM4sgDsCE9xIYDZDhddr3iY'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        setLiveAddress(data.results[0]);
      } else {
        setLiveAddress('No address found');
      }
    } catch (error) {
      setErrorMsg('Error fetching address');
    }
  };

  return (
    <StatusContext.Provider
      value={{ isOnline, setIsOnline, search, setSearch, vendorId, swipe, setSwipe, LiveAddress, errorMsg }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
