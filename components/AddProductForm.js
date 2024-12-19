// import { useEffect, useState } from "react";
// import { Pressable, StyleSheet } from "react-native";
// import { Modal, Text, View } from "react-native";

import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Button,
} from "react-native";
import { Entypo } from "react-native-vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import ImageContainer from "./ImageContainer";
import Header from "./Header";
import Header2 from "./Header2";

const AddProductForm = () => {
  //   console.log(open, "Add");
  //   useEffect(() => {
  //     setModalView(open);
  //   }, [open]);
  //   const [modalView, setModalView] = useState(true);
  //   console.log(open);
  //   console.log(modalView);

  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [showVendorDropdown, setShowVendorDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  //   const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  //   const [fields, setFields] = useState([{ tag: "" }]);

  //   const [variantsData, setVariantsData] = useState({
  //     Variants: [],
  //   });

  //     const handleInputChange = (text, field, index) => {
  //       setVariantsData({
  //         ...variantsData,
  //         Variants: [
  //           ...variantsData.Variants.slice(0, index),
  //           { ...variantsData.Variants[index], [field]: text },
  //           ...variantsData.Variants.slice(index + 1),
  //         ],
  //       });
  //     };

  //   const addVariant = () => {
  //     setVariantsData({
  //       ...variantsData,
  //       Variants: [
  //         ...variantsData.Variants,
  //         {
  //           Type: "",
  //           Value: "",
  //           SellingPrice: "",
  //           DisplayPrice: "",
  //           SKUId: "",
  //           Quantity: "",
  //           Image: null,
  //         },
  //       ],
  //     });
  //   };
  //   const removeVariant = (index) => {
  //     setVariantsData({
  //       ...variantsData,
  //       Variants: variantsData.Variants.filter((_, idx) => idx !== index),
  //     });
  //   };

  const [productData, setProductData] = useState({
    Vendor: "",
    ProductName: "",
    ProductCategory: "",
    ProductImage: "",
    // HsnCode: "",
    PurchasePrice: "",
    SellingPrice: "",
    DisplayPrice: "",
    ProductUnit: "",
    unitType: "",
    Description: "",
    Quantity: "",
    SKUId: "",
  });
  const [selectedVendor, setSelectedVendor] = useState("select vendor");
  const [selectedCategory, setSelectedCategory] = useState("select category");
  const [selectedUnit, setSelectedUnit] = useState("--");
  //   const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const vendorList = ["RetailTech", "Relience", "Chroma"];
  //   const [categories, setCategories] = useState([]);
  const [categoryList, setCategoryList] = useState([
    "Vegetables & Fruits",
    "Chips & Namkeen",
    "Sweets & Chocolates",
  ]);
  const [unitList, setUnitList] = useState(["mg", "kg", "ml", "l"]);
  const [imageUrl, setImageUrl] = useState("");
  //   const [subCategoryVisible, setSubCategoryVisible] = useState(false);
  //   const [subCategoryList, setSubCategoryList] = useState([]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //       base64: true,
      allowsEditing: true,
      //       aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleChange("ProductImage", result.assets[0].uri)
    //   handleUploadImage(result.assets[0].uri);
    }
  };
  //   const getProductCategorylist = async (value) => {
  //     try {
  //       const response = await axios.get(
  //         `https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/ProductCategoriesbyTypename?ProductType=${
  //           value || "Food"
  //         }`
  //       );
  //       setCategories(response.data.data.results);
  //       setCategoryList(response.data.data.results.map((category) => category));
  //       setSelectedCategory(
  //         response.data.data.results.map((category) => category)[0]
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const getSubCategorylist = async (id) => {
  //     try {
  //       const response = await axios.get(
  //         `https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/PrdSubCategoriesbyCategory/${id}`
  //       );
  //       setSubCategoryList(response.data.data.results);
  //       setSelectedSubCategory(
  //         response.data.data.results.map((category) => category)[0]
  //       );
  //     } catch (error) {
  //       console.log("Failed to get Sub Category list", error);
  //     }
  //   };
  //   const addProduct = async () => {
  //     const userId = await AsyncStorage.getItem("UserId");
  //     const formData = {
  //       ProductType: selectedProductType,
  //       ...(selectedProductType === "Shopping" && selectedSubCategory
  //         ? {
  //             prdSubCategoryId: selectedSubCategory._id,
  //             prdSubCategoryName: selectedSubCategory.Prd_sub_CategoryName,
  //           }
  //         : {}),
  //       ProductImage: imageUrl,
  //       ProductName: productData.ProductName,
  //       HsnCode:
  //         selectedProductType === "Food" ? null : Number(productData.HsnCode),
  //       PurchasePrice: productData.PurchasePrice,
  //       SellingPrice: productData.SellingPrice,
  //       DisplayPrice: productData.DisplayPrice,
  //       ProductUnit: productData.ProductUnit,
  //       unitType: productData.unitType,
  //       Description: productData.Description,
  //       Quantity: productData.Quantity,
  //       SKUId: productData.SKUId,
  //       VendorsArray: [userId],
  //       ProductCategoryArray: [selectedCategory._id],
  //       PrdTags: fields,
  //       Variants: variantsData.Variants,
  //     };
  //     console.log(formData);
  //     try {
  //       const response = await axios.post(
  //         "https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/Products",
  //         formData
  //       );
  //       if (response.data.status === "Success!") {
  //         navigation.navigate("Products");
  //         setProductData({});
  //         setImageUrl("");
  //         setImage("");
  //       }
  //       if (response.data.status === "Failed") {
  //         alert("Failed to Add Product");
  //       }
  //     } catch (error) {
  //       console.log("failed to add Product", error.response.data);
  //     }
  //   };
  //   useEffect(() => {
  //     // getProductCategorylist();
  //     // getSubCategorylist();
  //     setSelectedProductType(productTypes[0]);
  //     return () => {
  //       setSelectedCategory("");
  //     };
  //   }, []);
  //   const handleUploadImage = async (uri) => {
  //     if (!uri) {
  //       console.log("No image selected");
  //       return;
  //     }

  //     try {
  //       // Create FormData object
  //       const formData = new FormData();
  //       formData.append("file", {
  //         uri: uri,
  //         type: "image/jpeg", // Adjust the type if necessary
  //         name: "image.jpg", // Adjust the name if necessary
  //       });

  //       // Make a POST request to the API endpoint
  //       const response = await fetch(
  //         "https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/uploads3",
  //         {
  //           method: "POST",
  //           body: formData,
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       // Handle the response
  //       const data = await response.json();
  //       console.log("Upload response:", data.data.results);
  //       setImageUrl(data.data.results);
  //     } catch (error) {
  //       console.log("Error uploading image:", error);
  //     }
  //   };
  const handleVendorChange = (vendor) => {
    setSelectedVendor(vendor);
    handleChange("Vendor", vendor);
    setShowVendorDropdown(false);
    // getProductCategorylist(productType);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleChange("ProductCategory", category);
    setShowCategoryDropdown(false);
    // getSubCategorylist(category?._id);
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    handleChange("unitType", unit);
    setShowUnitDropdown(false);
  };
  //   const handleSelectSubCategoryType = (category) => {
  //     setSelectedSubCategory(category);
  //     setShowSubCategoryDropdown(false);
  //   };
  const handleChange = (name, value) => {
    setProductData({ ...productData, [name]: value });
  };

  //   const handleFieldChange = (index, value) => {
  //     const values = [...fields];
  //     values[index].tag = value;
  //     setFields(values);
  //   };

  //   const handleAdd = () => {
  //     const values = [...fields];
  //     values.push({ tag: "" });
  //     setFields(values);
  //   };

  //   const handleRemove = (index) => {
  //     const values = [...fields];
  //     values.splice(index, 1);
  //     setFields(values);
  //   };

  return (
    // <View>
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={modalView}
    //     onRequestClose={() => {
    //       Alert.alert("Modal has been closed.");
    //       setModalView(!modalView);
    //     }}
    //   >
    //     <View style={styles.centeredView}>
    //       <View style={styles.modalView}>
    //         <Text style={styles.modalText}>Hello World!</Text>
    //         <Pressable
    //           style={[styles.button, styles.buttonClose]}
    //           onPress={() => setModalView(!modalView)}
    //         >
    //           <Text style={styles.textStyle}>Hide Modal</Text>
    //         </Pressable>
    //       </View>
    //     </View>
    //   </Modal>
    // </View>

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <Header></Header> */}
      <Header2 routes={"Products"}/>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 10 }}>
          <Text style={styles.label}>Vendor</Text>
          <TouchableOpacity
            onPress={() => {
              setShowVendorDropdown(!showVendorDropdown);
              setShowCategoryDropdown(false);
              setShowUnitDropdown(false);
            }}
            style={styles.dropdownButton}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{selectedVendor}</Text>
              {showVendorDropdown ? (
                <Entypo size={20} name="chevron-up"></Entypo>
              ) : (
                <Entypo size={20} name="chevron-down"></Entypo>
              )}
            </View>
          </TouchableOpacity>

          {showVendorDropdown && (
            <View style={styles.dropdownList}>
              {vendorList.map((v, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleVendorChange(v);
                  }}
                >
                  <Text>{v}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={productData.ProductName}
            onChangeText={(value) => handleChange("ProductName", value)}
          />
          <View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Product Category</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowVendorDropdown(false);
                  setShowUnitDropdown(false);
                }}
                style={styles.dropdownButton}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{selectedCategory}</Text>
                  {showCategoryDropdown ? (
                    <Entypo size={20} name="chevron-up"></Entypo>
                  ) : (
                    <Entypo size={20} name="chevron-down"></Entypo>
                  )}
                </View>
              </TouchableOpacity>
              {showCategoryDropdown && (
                <View style={styles.dropdownList}>
                  {categoryList.map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => handleCategoryChange(category)}
                    >
                      <Text>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            {/* {selectedProductType === "Shopping" && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.label}>Select Sub Category</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowSubCategoryDropdown(!showSubCategoryDropdown);
                }}
                style={styles.dropdownButton}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{selectedSubCategory?.Prd_sub_CategoryName}</Text>
                  {showCategoryDropdown ? (
                    <Entypo size={20} name="chevron-up"></Entypo>
                  ) : (
                    <Entypo size={20} name="chevron-down"></Entypo>
                  )}
                </View>
              </TouchableOpacity>
              {showSubCategoryDropdown && (
                <View style={styles.dropdownList}>
                  {subCategoryList.map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => handleSelectSubCategoryType(category)}
                    >
                      <Text>{category?.Prd_sub_CategoryName}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
          {selectedProductType !== "Food" && (
            <>
              <Text style={styles.label}>HsnCode</Text>
              <TextInput
                style={styles.input}
                placeholder="HsnCode"
                value={productData.HsnCode}
                keyboardType="number-pad"
                onChangeText={(value) => handleChange("HsnCode", value)}
              />
            </>
          )} */}

            {/* <Text style={styles.fieldlabel}>Product Tags</Text>
            {fields.map((field, index) => (
              <View key={index} style={styles.fieldContainer}>
                <TextInput
                  style={[styles.input, { marginBottom: 0, width: "90%" }]}
                  placeholder="Enter text"
                  value={field.tag}
                  onChangeText={(value) => handleFieldChange(index, value)}
                />
                <TouchableOpacity
                  onPress={() => handleRemove(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>-</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Tag</Text>
            </TouchableOpacity> */}
          </View>

          <Text style={styles.label}>Purchase Price</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="eg:300"
            value={productData.PurchasePrice}
            onChangeText={(value) => handleChange("PurchasePrice", value)}
          />
          {/* {typeof (Number(productData.PurchasePrice) + 0) !== "number" && (
            <Text style={styles.errorText}>please enter number</Text>
            )} */}
          <Text style={styles.label}>Selling Price</Text>
          <TextInput
            style={styles.input}
            placeholder="eg:300"
            keyboardType="numeric"
            value={productData.SellingPrice}
            onChangeText={(value) => handleChange("SellingPrice", value)}
          />
          <Text style={styles.label}>Display Price</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="eg:300"
            value={productData.DisplayPrice}
            onChangeText={(value) => handleChange("DisplayPrice", value)}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={styles.label}>Product Unit</Text>
              <TextInput
                style={{
                  height: 50,
                  borderColor: "#ccc",
                  borderWidth: 1,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  fontSize: 18,
                  marginBottom: 10,
                  backgroundColor: "#fff",
                  width: 260,
                }}
                keyboardType="numeric"
                placeholder="eg:1"
                value={productData.ProductUnit}
                onChangeText={(value) => handleChange("ProductUnit", value)}
              />
            </View>
            <View style={{ marginEnd: 20 }}>
              <Text style={styles.label}>Unit Type</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowUnitDropdown(!showUnitDropdown);
                  setShowVendorDropdown(false);
                  setShowCategoryDropdown(false);
                }}
                style={styles.dropdownButton}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{selectedUnit}</Text>
                  {showUnitDropdown ? (
                    <Entypo size={20} name="chevron-up"></Entypo>
                  ) : (
                    <Entypo size={20} name="chevron-down"></Entypo>
                  )}
                </View>
              </TouchableOpacity>
              {showUnitDropdown && (
                <View style={styles.dropdownList}>
                  {unitList.map((unit, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => handleUnitChange(unit)}
                    >
                      <Text>{unit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          {/* <Text style={styles.label}>Unit Type</Text>
          <TextInput
            style={styles.input}
            placeholder="eg:piece"
            value={productData.unitType}
            onChangeText={(value) => handleChange("unitType", value)}
          /> */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={productData.Description}
            onChangeText={(value) => handleChange("Description", value)}
          />
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="eg:10"
            value={productData.Quantity}
            onChangeText={(value) => handleChange("Quantity", value)}
          />
          <Text style={styles.label}>SKUId</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="eg:34645"
            value={productData.SKUId}
            onChangeText={(value) => handleChange("SKUId", value)}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
              {image ? (
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
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ marginVertical: 20, width: "75%", alignSelf: "center" }}
          >
            <Button title="Add Products" color={"red"} 
            // onPress={()=>console.log(productData)} 
            />
          </TouchableOpacity>
          {/* <Text style={styles.label}>Variants :</Text>
          {variantsData.Variants.map((variant, index) => (
            <View key={index} style={{ marginTop: 20 }}>
              <TextInput
                placeholder="Type"
                style={styles.input}
                value={variant.Type}
                onChangeText={(text) => handleInputChange(text, "Type", index)}
              />
              <TextInput
                placeholder="Value"
                keyboardType="numeric"
                style={styles.input}
                value={variant.Value}
                onChangeText={(text) => handleInputChange(text, "Value", index)}
              />

              <TextInput
                placeholder="SellingPrice"
                keyboardType="numeric"
                style={styles.input}
                value={variant.SellingPrice}
                onChangeText={(text) =>
                  handleInputChange(text, "SellingPrice", index)
                }
              />
              <TextInput
                placeholder="DisplayPrice"
                keyboardType="numeric"
                style={styles.input}
                value={variant.DisplayPrice}
                onChangeText={(text) =>
                  handleInputChange(text, "DisplayPrice", index)
                }
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="SKUId"
                value={variant.SKUId}
                onChangeText={(text) => handleInputChange(text, "SKUId", index)}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Quantity"
                value={variant.Quantity}
                onChangeText={(text) =>
                  handleInputChange(text, "Quantity", index)
                }
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageContainer
                  handleChange={(text) =>
                    handleInputChange(text, "Image", index)
                  }
                  text={"Pick Product Image"}
                ></ImageContainer>
              </View>

              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => removeVariant(index)}
              >
                <Text style={[styles.addBtnTxt, { padding: 5 }]}>
                  Remove Variant
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addBtn} onPress={addVariant}>
            <Text style={[styles.addBtnTxt, { padding: 5 }]}>Add Variant</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addBtn} onPress={addProduct}>
            <Text style={styles.addBtnTxt}>Add Product</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  addBtn: {
    // backgroundColor: Colors.primary,
    margin: 10,
    borderRadius: 5,
  },
  addBtnTxt: {
    textAlign: "center",
    color: "#fff",
    padding: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 200,
    height: 200,
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
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: "#fff",
    //minWidth: 260
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
  dropdownButton: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  dropdownList: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 0,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    fontSize: 16,
    color: "#333",
  },
  fieldlabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  removeButton: {
    // backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    // backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   // buttonOpen: {
//   //   backgroundColor: '#F194FF',
//   // },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
// });

export default AddProductForm;
