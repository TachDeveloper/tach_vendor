import { Image, StyleSheet, Text, View } from "react-native";
import { baseImageUrl } from "../constants/Constants";

const OrderDetails = ({expand, products}) => {
  if (expand) {
    return (
      <View style={styles.prodContainer}>
        {products.map((product, index) => (
          <View
          key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "100%",
              borderTopWidth: 1,
              borderTopColor: index === 0 ? "#fff" : "#ddd",
            }}
          >
            <Image
              source={{
                uri: baseImageUrl + product.img,
              }}
              style={styles.image}
            />
            <View style={{ width: "70%" }}>
              <Text style={styles.productName}>
                {product.product_name}
              </Text>
              {/* <Text style={styles.productDescription}>
                Quantity: {product.qty}
              </Text> */}
              <Text style={styles.productPrice}>
                Price: ₹ {product.product_price}
              </Text>
              <Text style={styles.productQuantity}>
                Quantity: {product.qty}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  prodContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 5,
  },
  productName: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDescription: {
    marginBottom: 5,
    fontSize: 10,
  },
  productPrice: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 10,
  },
  productQuantity: {
    marginBottom: 5,
    fontSize: 10,
  },
});

export default OrderDetails;
