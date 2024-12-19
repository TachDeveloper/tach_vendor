import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { pickImage } from "./utils";
// import Colors from "../../constants/Colors";

export const ImageContainer = ({ handleChange, text, image }) => {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    setImageUrl(image);
  }, [image]);
  const [loading, setLoading] = useState(false);
  const handlePick = async () => {
    setLoading(true);
    try {
      const response = await pickImage();
      setImageUrl(response);
      // Add logic here to handle the image after it's picked if needed
      handleChange(response);
    } catch (error) {
      console.log("Error picking image:", error);
      // Handle error if necessary
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: 10,
      }}
    >
      {/* <TouchableOpacity onPress={handlePick} style={styles.imageContainer}>
        const [loading, setLoading] = useState(true);
        {imageUrl ? (
          imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : null
        ) : (
          <Text>Pick Product Image </Text>
        )}
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={handlePick}
        disabled={loading}
        style={styles.imageContainer}
      >
        {/* {!imageUrl && (
          <Text>
            {loading ? (
              <ActivityIndicator color={Colors.primary}></ActivityIndicator>
            ) : (
              text
            )}
          </Text>
        )}

        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        )} */}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },

  image: {
    height: "100%",
    width: "100%",
  },
});
export default ImageContainer;
