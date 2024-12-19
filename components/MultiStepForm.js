import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ImageContainer from "./ImageContainer";
// import Colors from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Header2 from "./Header2";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState("");

  const getLocalStorage = async () => {
    try {
      const data = await AsyncStorage.getItem("UserId");
      setUserId(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmErrorMag, setConfirmErrorMsg] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(true);

  useEffect(() => {
    // Check if password is empty on initial render
    if (!formData.password) {
      setShowPasswordFields(true);
    }
  }, []);
  const [formData, setFormData] = useState({
    contact_number: "",
    address_details: "",
    Email: "",
    password: "",
    Notes: "",
    GstFileImage: "",
    BusinessLicenseImage: "",
    BankName: "",
    ac_Number: "",
    ifsc_Code: "",
    pan_Number: "",
    aadhar_Number: "",
    gstNumber: "",
    BusinessType: "",
    shopImage: "",
    website: "",
  });
  const submitData = async () => {
    if (await handleNext()) {
      // console.log(await handleNext(), "handle next");
      updateData(step);
      // // console.log(formData);
      // if (step <= 5) {
      //   // updateData(step + 1);
      // } else {
      // }
      // setFormData({});
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/Vendor/${userId}`
      );
      if (response.data.status === "Success!") {
        const data = response.data.data.results;
        setStep(data.index);
        // console.log(data.index);
        const newFormData = {
          contact_number: String(data?.contact_details?.contact_number),
          address_details: data?.contact_details?.address_details,
          Email: data?.contact_details?.Email,
          password: data?.contact_details?.password,
          Notes: data?.documents_details?.Notes,
          GstFileImage: data?.documents_details?.GstFile,
          BusinessLicenseImage: data?.documents_details?.BusinessLicense,
          BankName: data?.payment_details?.BankName,
          ac_Number:
            data?.payment_details?.ac_Number &&
            String(data?.payment_details?.ac_Number),
          ifsc_Code: data?.payment_details?.ifsc_Code,
          pan_Number: data?.payment_details?.pan_Number,
          aadhar_Number:
            data?.payment_details?.aadhar_Number &&
            String(data?.payment_details?.aadhar_Number),
          gstNumber: data?.payment_details?.gstNumber,
          BusinessType: data?.shop_details?.BusinessType,
          shopImage: data?.shop_details?.shopImage,
          website: data?.shop_details?.website,
        };
        setFormData((prevState) => ({
          ...prevState,
          ...newFormData,
        }));

        // Clear corresponding errors if needed
        const newErrors = Object.keys(newFormData).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});

        setErrors((prevErrors) => ({
          ...prevErrors,
          ...newErrors,
        }));
      }

      // handleChange(
      //   "contact_number",
      //   String(data.contact_details.contact_number)
      // );
      // handleChange("address_details", data.contact_details.address_details);
      // handleChange("Email", data.contact_details.Email);
      return response.data;
    } catch (error) {
      // Handle error
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateData = async (step) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://vyg4zqadta.execute-api.ap-south-1.amazonaws.com/production/api/zupaar/Vendor/${userId}`,
        {
          Name: "mujeeb",
          index: step + 1,
          contact_details: {
            contact_number: formData.contact_number,
            address_details: formData.address_details,
            Email: formData.Email,
            password: formData.password,
          },
          shop_details: {
            BusinessType: formData.BusinessType,
            shopImage: formData.shopImage,
            website: formData.website,
          },
          payment_details: {
            BankName: formData.BankName,
            ac_Number: formData.ac_Number,
            ifsc_Code: formData.ifsc_Code,
            pan_Number: formData.pan_Number,
            aadhar_Number: formData.aadhar_Number,
            gstNumber: formData.gstNumber,
          },
          documents_details: {
            Notes: formData.Notes,
            GstFile: formData.GstFileImage,
            BusinessLicense: formData.BusinessLicenseImage,
          },
        }
      );
      if (response.data.status === "Success!") {
        // console.log(response.data.data.results.index);
        setStep(response.data.data.results.index);
        fetchData();
        return true;
      } else {
        console.log("something went wrong, Failed to update Sign Up data");
        return false;
      }
    } catch (error) {
      console.log("Failed to update Sign Up data", error);
    } finally {
      setLoading(false);
    }
  };

  
  useFocusEffect(
    React.useCallback(() => {
      getLocalStorage();
      if (userId) {
        fetchData();
      }
      return () => {
        setFormData({});
        setErrors({});
        setConfirmPassword("");
        setConfirmErrorMsg("");
      };
    }, [userId])
  );

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleNext = async () => {
    let isValid = true;
    const currentStepErrors = {};

    // Validation for Step 1
    if (step === 1) {
      if (!formData.contact_number) {
        isValid = false;
        currentStepErrors.contact_number = "Contact number is required";
      }
      if (!formData.address_details) {
        isValid = false;
        currentStepErrors.address_details = "Address details are required";
      }
      if (!formData.Email) {
        isValid = false;
        currentStepErrors.Email = "Email is required";
      }
      if (showPasswordFields) {
        if (formData.password?.length < 6) {
          isValid = false;
          currentStepErrors.password =
            "Password should be more than 6 charecters";
        }
        if (!formData.password) {
          isValid = false;
          currentStepErrors.password = "Password is required";
        }
        if (confirmPassword !== formData.password) {
          isValid = false;
          setConfirmErrorMsg("Confirm Password Does not match");
        }
        if (!confirmPassword) {
          isValid = false;
          setConfirmErrorMsg("Confirm Password is required");
        }
      }
    }
    // Validation for Step 2
    if (step === 2) {
      if (!formData.BusinessType) {
        isValid = false;
        currentStepErrors.BusinessType = "Business type is required";
      }
      if (!formData.shopImage) {
        isValid = false;
        currentStepErrors.shopImage = "Shop image is required";
      }
      if (!formData.website) {
        isValid = false;
        currentStepErrors.website = "Website is required";
      }
    }

    // Validation for Step 3
    if (step === 3) {
      if (!formData.BankName) {
        isValid = false;
        currentStepErrors.BankName = "Bank name is required";
      }
      if (!formData.ac_Number) {
        isValid = false;
        currentStepErrors.ac_Number = "Account number is required";
      }
      if (!formData.ifsc_Code) {
        isValid = false;
        currentStepErrors.ifsc_Code = "IFSC code is required";
      }
      if (!formData.pan_Number) {
        isValid = false;
        currentStepErrors.pan_Number = "PAN number is required";
      }
      if (!formData.aadhar_Number) {
        isValid = false;
        currentStepErrors.aadhar_Number = "Aadhar number is required";
      }
      if (!formData.gstNumber) {
        isValid = false;
        currentStepErrors.gstNumber = "GST number is required";
      }
    }

    // Validation for Step 4
    if (step === 4) {
      if (!formData.Notes) {
        isValid = false;
        currentStepErrors.Notes = "Notes are required";
      }
      if (!formData.GstFileImage) {
        isValid = false;
        currentStepErrors.GstFileImage = "GST file image is required";
      }
      if (!formData.BusinessLicenseImage) {
        isValid = false;
        currentStepErrors.BusinessLicenseImage =
          "Business license image is required";
      }
    }
    // Update errors state with current step errors

    // Proceed to next step only if the form is valid
    if (isValid && step < 4) {
      try {
        const response = await updateData(step);
        // if (response && step < 4) {
        //   setStep(step + 1);
        // } else {
        // }
      } catch (error) {
        console.log("failed to update signup data", error);
      }
    }
    setErrors(currentStepErrors);
    return isValid;
  };
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
    if(showPasswordFields){
      setShowPasswordFields(false)
    }
  };

  const renderStep1 = () => {
    return (
      <View>
        <Text style={styles.heading}>Contact Details</Text>
        <TextInput
          placeholder="Contact Number"
          value={formData.contact_number}
          keyboardType="number-pad"
          onChangeText={(text) => handleChange("contact_number", text)}
          style={styles.input}
        />
        {errors.contact_number && (
          <Text style={styles.error}>{errors.contact_number}</Text>
        )}
        <TextInput
          placeholder="Address Details"
          value={formData.address_details}
          onChangeText={(text) => handleChange("address_details", text)}
          style={styles.input}
        />
        {errors.address_details && (
          <Text style={styles.error}>{errors.address_details}</Text>
        )}
        <TextInput
          placeholder="Email"
          value={formData.Email}
          onChangeText={(text) => handleChange("Email", text)}
          style={styles.input}
        />
        {errors.Email && <Text style={styles.error}>{errors.Email}</Text>}
        {/* <TextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          style={styles.input}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmErrorMsg("");
            setConfirmPassword(text);
          }}
          style={styles.input}
        />
        {confirmErrorMag && <Text style={styles.error}>{confirmErrorMag}</Text>} */}

        {showPasswordFields && (
          <>
            <TextInput
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmErrorMsg("");
                setConfirmPassword(text);
              }}
              style={styles.input}
            />
            {confirmErrorMag && (
              <Text style={styles.error}>{confirmErrorMag}</Text>
            )}
          </>
        )}
      </View>
    );
  };

  const renderStep2 = () => (
    <View>
      <Text style={styles.heading}>Shop Details</Text>
      <TextInput
        selectionColor="blue"
        placeholder="Business Type"
        value={formData.BusinessType}
        onChangeText={(text) => handleChange("BusinessType", text)}
        style={styles.input}
      />
      {errors.BusinessType && (
        <Text style={styles.error}>{errors.BusinessType}</Text>
      )}

      <TextInput
        placeholder="Website"
        value={formData.website}
        onChangeText={(text) => handleChange("website", text)}
        style={styles.input}
      />
      {errors.website && <Text style={styles.error}>{errors.website}</Text>}
      <ImageContainer
        image={formData.shopImage}
        handleChange={(text) => handleChange("shopImage", text)}
        text={"Shop Image"}
      ></ImageContainer>
      {errors.shopImage && <Text style={styles.error}>{errors.shopImage}</Text>}
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.heading}>Payment Details</Text>
      <TextInput
        placeholder="Bank Name"
        value={formData.BankName}
        onChangeText={(text) => handleChange("BankName", text)}
        style={styles.input}
      />
      {errors.BankName && <Text style={styles.error}>{errors.BankName}</Text>}
      <TextInput
        placeholder="Account Number"
        value={formData.ac_Number}
        onChangeText={(text) => handleChange("ac_Number", text)}
        style={styles.input}
      />
      {errors.ac_Number && <Text style={styles.error}>{errors.ac_Number}</Text>}
      <TextInput
        placeholder="IFSC Code"
        value={formData.ifsc_Code}
        onChangeText={(text) => handleChange("ifsc_Code", text)}
        style={styles.input}
      />
      {errors.ifsc_Code && <Text style={styles.error}>{errors.ifsc_Code}</Text>}
      <TextInput
        placeholder="PAN Number"
        value={formData.pan_Number}
        onChangeText={(text) => handleChange("pan_Number", text)}
        style={styles.input}
      />
      {errors.pan_Number && (
        <Text style={styles.error}>{errors.pan_Number}</Text>
      )}
      <TextInput
        placeholder="Aadhar Number"
        value={formData.aadhar_Number}
        onChangeText={(text) => handleChange("aadhar_Number", text)}
        style={styles.input}
      />
      {errors.aadhar_Number && (
        <Text style={styles.error}>{errors.aadhar_Number}</Text>
      )}
      <TextInput
        placeholder="GST Number"
        value={formData.gstNumber}
        onChangeText={(text) => handleChange("gstNumber", text)}
        style={styles.input}
      />
      {errors.aadhar_Number && (
        <Text style={styles.error}>{errors.aadhar_Number}</Text>
      )}
    </View>
  );
  const renderStep4 = () => (
    <View>
      <Text style={styles.heading}>Document Details</Text>
      <TextInput
        placeholder="Notes"
        value={formData.Notes}
        onChangeText={(text) => handleChange("Notes", text)}
        style={styles.input}
      />
      {errors.Notes && <Text style={styles.error}>{errors.Notes}</Text>}

      {/* <TextInput
        placeholder="Gst File Image"
        value={formData.GstFileImage}
        onChangeText={(text) => handleChange("GstFileImage", text)}
        style={styles.input}
      /> */}
      <ImageContainer
        image={formData.GstFileImage}
        handleChange={(text) => handleChange("GstFileImage", text)}
        text={"Gst File Image"}
      ></ImageContainer>
      {errors.GstFileImage && (
        <Text style={styles.error}>{errors.GstFileImage}</Text>
      )}

      {/* <TextInput
        placeholder="Business License Image"
        value={formData.BusinessLicenseImage}
        onChangeText={(text) => handleChange("BusinessLicenseImage", text)}
        style={styles.input}
      /> */}
      <ImageContainer
        image={formData.BusinessLicenseImage}
        handleChange={(text) => handleChange("BusinessLicenseImage", text)}
        text={"Business License Image"}
      ></ImageContainer>
      {errors.BusinessLicenseImage && (
        <Text style={styles.error}>{errors.BusinessLicenseImage}</Text>
      )}
    </View>
  );
  const renderStep5 = () => (
    <View style={styles.container5}>
      <View style={styles.content5}>
        <Text style={styles.text5}>
          Your Profile Is Fully Uploaded Successfully. Please Wait For Approval.
        </Text>
      </View>
    </View>
  );
  const renderStepCount = () => (
    <View style={styles.stepCountContainer}>
      <View style={styles.stepContainer}>
        <TouchableOpacity
          onPress={() => setStep(1)}
          style={[styles.step, step >= 1 && styles.stepActive]}
        >
          <Text style={styles.stepText}>1</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.line, step > 1 && styles.lineActive]}></View>
      <TouchableOpacity onPress={() => setStep(2)} style={styles.stepContainer}>
        <View style={[styles.step, step >= 2 && styles.stepActive]}>
          <Text style={styles.stepText}>2</Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.line, step > 2 && styles.lineActive]}></View>
      <TouchableOpacity onPress={() => setStep(3)} style={styles.stepContainer}>
        <View style={[styles.step, step >= 3 && styles.stepActive]}>
          <Text style={styles.stepText}>3</Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.line, step > 3 && styles.lineActive]}></View>
      <TouchableOpacity onPress={() => setStep(4)} style={styles.stepContainer}>
        <View style={[styles.step, step >= 4 && styles.stepActive]}>
          <Text style={styles.stepText}>4</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header2 routes={"SignUp"}/>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator
                size={"large"}
                color="blue"
              ></ActivityIndicator>
            </View>
          ) : (
            <View>
              {step < 5 && renderStepCount()}

              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
              {step === 5 && renderStep5()}
              <View
                style={[
                  styles.buttonContainer,
                  { justifyContent: step > 1 ? "space-between" : "flex-end" },
                ]}
              >
                {step > 1 && step < 5 && (
                  <TouchableOpacity style={styles.button} onPress={handlePrev}>
                    <Text style={{ color: "#fff" }}>Prev</Text>
                  </TouchableOpacity>
                )}
                {step < 4 && (
                  <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={{ color: "#fff" }}>Next</Text>
                  </TouchableOpacity>
                )}
                {step === 4 && (
                  <TouchableOpacity style={styles.button} onPress={submitData}>
                    <Text style={{ color: "#fff" }}>Submit</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {errors && (
            <View>
              <Text style={{ color: "red" }}>{errors.name}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  error: {
    color: "red",
    marginBottom: 5,
    fontSize: 10,
  },
  heading: { fontSize: 20, marginBottom: 20, letterSpacing: 2 },
  input: {
    borderWidth: 1,
    borderColor: "#b71018",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#b71018",
    borderRadius: 5,
  },
  stepCount: {
    alignItems: "center",
    marginBottom: 20,
  },
  stepCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  stepContainer: {
    alignItems: "center",
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  stepActive: {
    backgroundColor: "#b71018",
  },
  stepText: {
    color: "white",
  },
  stepLabel: {
    marginTop: 5,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "lightgray",
    marginHorizontal: 5,
  },

  lineActive: {
    backgroundColor: "#b71018",
  },
  container5: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content5: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: "#b71018",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // For Android shadow
  },
  text5: {
    fontSize: 18,
    color: "#b71018",
    textAlign: "center",
  },
});

export default MultiStepForm;
