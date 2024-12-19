import { StyleSheet, Text, View } from "react-native";

const Card = ({ data }) => {
  const keys = Object.keys(data);

  return (
    <View style={styles.body}>
      <Text style={styles.heading}>{data.title}</Text>
      <View>
        {keys.map((key) => (
          key !== "title" && (
            <View key={key} style={styles.container}>
              <Text style={styles.label}>
                {key.replace("_", " ") + " :"}
              </Text>
              <Text>{" " + data[key]}</Text>
            </View>
          )
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    margin: 8,
    padding: 10,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  heading: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  label: {
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    padding: 1
  }
});

export default Card;
