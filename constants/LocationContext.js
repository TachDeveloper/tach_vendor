// LocationContext.js
import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [LiveAddress, setLiveAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    <LocationContext.Provider value={{ LiveAddress, errorMsg }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
