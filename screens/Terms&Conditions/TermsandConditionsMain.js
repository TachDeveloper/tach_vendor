import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";


const TermsandConditionsMain = () => {
  return (
    <View>
      <CustomHeader title={"Terms & Conditions"} />
      <View style={{ padding: 20 }}>
        {/* <AntDesign name="arrowleft" onPress={()=> Navigation.goBack()} size={24} color="black" /> */}
        <Text style={{ fontWeight: "bold", fontSize: 40, paddingBottom: 15 }}>
          Terms & Conditions
        </Text>
        <Text style={styles.Textstyling}>
          A Terms and Conditions agreement is where you let the public know the
          terms, rules and guidelines for using your website or mobile app.
        </Text>
        <Text style={styles.Textstyling}>
          They include topics such as acceptable use, restricted behavior and
          limitations of liability
        </Text>
        <Text style={{ fontWeight: "bold", color: "#0eb7eb", marginTop: 8 }}>
          Read Full Terms & Conditions
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    Textstyling: {
        fontSize: 16,
        width: '90%',

        // letterSpacing:1,
    },
    continuebtn: {
        width: 150,
        // borderWidth: 1,
        borderRadius:10,
        color:'white',
        fontWeight:"bold",
        fontSize:18,
        textAlign: 'center',
        paddingTop: 5,
        justifyContent: "center",
        backgroundColor:"#0eb7eb",
        height: 40,

    }
})

export default TermsandConditionsMain;
