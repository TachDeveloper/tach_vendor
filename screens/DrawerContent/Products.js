import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { ScrollView } from "react-native";
import { useState } from "react";
import MIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FiveStarRating from "../../components/FiveStartRating";
import { useNavigation } from "@react-navigation/native";
// import AddProductsButton from "../../components/AddProduct";
// import AddProductForm from "../../components/AddProductForm.js";

const Products = () => {
  const [products, setProducts] = useState([
    {
      img: "https://www.tasteofhome.com/wp-content/uploads/2019/05/mangos-shutterstock_1090910984.jpg",
      title: "Mango",
      price: "Rs.120",
      rating: {
        rate: 5,
        count: 0,
      },
    },
    {
      img: "https://png.pngtree.com/png-clipart/20221015/original/pngtree-guava-fruit-png-image_8692077.png",
      title: "Guava",
      price: "Rs.100",
      rating: {
        rate: 5,
        count: 0,
      },
    },
    {
      img: "https://images.pexels.com/photos/588587/pexels-photo-588587.jpeg?cs=srgb&dl=apple-blur-bright-close-up-588587.jpg&fm=jpg",
      title: "Apple",
      price: "Rs.220",
      rating: {
        rate: 4.5,
        count: 0,
      },
    },
    {
      img: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/2/9/shutterstock_689220253-EQ-Roy_pineapple-plant.jpg.rend.hgtvcom.1280.1920.suffix/1518211407458.jpeg",
      title: "Pinapple",
      price: "Rs.170",
      rating: {
        rate: 4.2,
        count: 0,
      },
    },
  ]);

  const [viewForm, setViewForm] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{height: "100%"}}>
      {/* <Header /> */}
      <SafeAreaView style={{position: "relative"}}>
        <View>
            {/* <TextInput
                    style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    fontSize: 20,
                    margin: 10,
                    marginBottom:0
                    }}
                    placeholder="Search Products"
                    // onChangeText={handleSearch}
                    // value={searchText}
                /> */}
            <Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 20 }}>Products</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                style={{ marginHorizontal: 10 ,height:"100%"}}
                >
                {products.map((item, index) => (
                    <View key={index} style={styles.cardContainer}>
                    <Image
                        height={80}
                        width={80}
                        source={{ uri: item.img }}
                        style={{ borderRadius: 10 }}
                    />
                    <View style={styles.content}>
                        <View
                        //   style={{
                        //     flexDirection: "column",
                        //     justifyContent: "space-between",
                        //   }}
                        >
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                            {item.title}
                        </Text>
                        <Text>{item.price}</Text>
                        <View style={{ flexDirection: "row" }}>
                            {/* {item.rating.rate === 5 ? (
                            <View style={{ flexDirection: "row" }}>
                                <MIcons name="star" color={"green"} size={20} />
                                <MIcons name="star" color={"green"} size={20} />
                                <MIcons name="star" color={"green"} size={20} />
                                <MIcons name="star" color={"green"} size={20} />
                                <MIcons name="star" color={"green"} size={20} />
                            </View>
                            ) : item.rating.rate < 5 && item.rating.rate > 4 ? (
                            <View style={{ flexDirection: "row" }}>
                                <MIcons name="star" color={"green"} size={20} />
                                <MIcons name="star" color={"green"} size={20} />
                                <MIcons name="star" color={"green"} size={20} />
                                <MIcons name="star" color={"green"} size={20} />
                                <MIcons
                                name="star-half-full"
                                color={"green"}
                                size={20}
                                />
                            </View>
                            ) : (
                            <View></View>
                            )} */}
                        <FiveStarRating rating={item.rating.rate}></FiveStarRating>
                        <Text>{`(${item.rating.count})`}</Text>
                    </View>
                    </View>
                    <TouchableOpacity>
                    <Text>Details</Text>
                    </TouchableOpacity>
                </View>
                </View>
            ))}
            </ScrollView>
        </View>
          {/* <AddProductsButton /> */}
        {/* <TouchableOpacity style={{color:"white", position: "absolute", marginTop: 690, width:"50%", alignSelf: "center"}}>
          <Button title="Add Products" color={"red"} onPress={()=> navigation.navigate('AddProductForm')} />
        </TouchableOpacity>     */}
          {/* <AddProductForm open={viewForm} /> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    margin: 5,
    padding: 5,
    // borderWidth:2,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  content: {
    width: "75%",
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingEnd: 10,
  },
});

export default Products;
