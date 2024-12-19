import { useRef } from "react";
import { View } from "react-native";
import { StyleSheet, TextInput } from "react-native";

const CustomOTPInput = ({ numberOfInputs = 4, otp, setOtp }) => {
    const inputRefs = useRef([]);
  
    const handleInput = (text, index) => {
      let newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
  
      if (text !== "" && index < numberOfInputs - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleBackspace = (index) => {
      if (index > 0) {
        let newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    };
  
    return (
      <View style={styles.otpContainer}>
        {Array(numberOfInputs)
          .fill()
          .map((_, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="numeric"
              selectionColor={"#fff"}
              value={otp[index]}
              onChangeText={(text) => handleInput(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
      </View>
    );
  };
  const styles = StyleSheet.create({ otpInput: {
    borderWidth: 2,
    borderColor: "#fff",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },})
  export default CustomOTPInput;