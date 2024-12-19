import { Button, SafeAreaView, Text, View } from "react-native"
import Header from "../../components/Header"
import { ScrollView } from "react-native";
import Card from "../../components/Card";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {

    const data = ([
        {
            title:"Contact Details",
            Contact_Number: "9969695123",
            Email: "iampriyanshunayak007@gmail.com",
            Address: "Esdy Office, opp of Virinchi Hospital, Banjara Hills"
        },
        {
            title:"Shop Details",
            Buisness_Type: "9969695123",
            Website: "iampriyanshunayak007@gmail.com",
            Address: "Esdy Office, opp of Virinchi Hospital, Banjara Hills",
            Shop_Phone_No: "9969695123",
            Email: "iampriyanshunayak007@gmail.com",
            Shop_Address: "Esdy Office, opp of Virinchi Hospital"
        }
    ]);
    const navigation = useNavigation();

   
        // console.log(data);
   

    return (
        <View>
            <Header/>
            <SafeAreaView>
                <ScrollView>
                    <View>
                        {
                            data.map(d=>(<Card key={d.title} data={d} />))
                            
                        }
                    </View>
                    <Button title="Log Out" color={"red"} onPress={()=> navigation.navigate("Login")} />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Profile;