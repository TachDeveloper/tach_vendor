import Header from "../../components/Header";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import PieChart from "../../components/PieChart";


const data = {
    Milk: {
      totalSales: 1805,
      orderCount: 500,
      salesPercentage: 40,
      orderPercentage: 40,
      salesColor: "#3498db",
      orderColor: "#708090",
    },
    Chocolate: {
      totalSales: 566,
      orderCount: 380,
      salesPercentage: 30,
      orderPercentage: 30,
      salesColor: "#2ecc71",
      orderColor: "#5F9EA0",
    },
    Rice: {
      totalSales: 554,
      orderCount: 320,
      salesPercentage: 10,
      orderPercentage: 10,
      salesColor: "#f39c12",
      orderColor: "#B0C4DE",
    },
    Chips: {
        totalSales: 209,
        orderCount: 1,
        salesPercentage: 10,
        orderPercentage: 10,
        salesColor: "#FF5F4E",
        orderColor: "#F87B7C",
      },
    ColdDrinks: {
        totalSales: 216,
        orderCount: 1,
        salesPercentage: 10,
        orderPercentage: 10,
        salesColor: "#000C88",
        orderColor: "#E4080A",
      },
  };

  const keys = Object.keys(data);

const LegendItem = ({ label, color }) => (
  <View style={styles.legendItem}>
    <Text>{label}</Text>
    <View style={[styles.legendColor, { backgroundColor: color }]} />
  </View>
);

const Analytics = () => {
  return (
    <View style={styles.flex}>
      {/* <Header /> */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* {
            keys.map(key=>
                <View>
                    <PieChart data={data} percentageKey="salesPercentage" colorKey="salesColor"/>
                    <LegendItem label={`Food : ₹${data.Milk.totalSales}`} color={data.Milk.salesColor} />
                    <LegendItem label={`Shopping : ₹${data.Chocolate.totalSales}`} color={data.Chocolate.salesColor} />
                    <LegendItem label={`Grocery : ₹${data.Rice.totalSales}`} color={data.Rice.salesColor} />
                    <Text style={styles.title}>Sales Percentage</Text>
                </View>
            )
          } */}
          <PieChart data={data} percentageKey="salesPercentage" colorKey="salesColor"/>
          <LegendItem label={`Milk : ₹${data.Milk.totalSales}`} color={data.Milk.salesColor} />
          <LegendItem label={`Chocolate : ₹${data.Chocolate.totalSales}`} color={data.Chocolate.salesColor} />
          <LegendItem label={`Rice : ₹${data.Rice.totalSales}`} color={data.Rice.salesColor} />
          <Text style={styles.title}>Sales Percentage</Text>
          <PieChart data={data} percentageKey="orderPercentage" colorKey="orderColor"/>
          <LegendItem label={`Milk : ${data.Milk.orderCount}`} color={data.Milk.orderColor} />
          <LegendItem label={`Chocolate : ${data.Chocolate.orderCount}`} color={data.Chocolate.orderColor} />
          <LegendItem label={`Rice : ${data.Rice.orderCount}`} color={data.Rice.orderColor} />
          <Text style={styles.title}>Order Percentage</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textDecorationLine:"underline"
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendColor: {
    height: 10,
    width: 10,
    marginLeft: 5,
  },
});

export default Analytics;