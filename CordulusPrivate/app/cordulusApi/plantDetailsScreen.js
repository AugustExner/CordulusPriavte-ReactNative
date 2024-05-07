import React from "react";
import { View, Text, Image, StyleSheet, } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import plantData from "../../assets/plants.json";
import { useLocalSearchParams } from "expo-router";

export default function plantDetailsScreen() {

  const screenWidth = Dimensions.get("window").width;
  const {plantName} = useLocalSearchParams();

  const data = {
    labels: ["-3", "-2","-1", "Today", "+2", "+3", "+4", "+5"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 60, 48],
        color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
        strokeWidth: 2
      }
    ],
};

  return (
    <View>
      <Text style={styles.chartText}>{plantName}</Text>
      <Image
          style={styles.image}
          source={require("../../assets/gardenBed.png")}
        />
      <Text style={styles.sensorText}>Guide:</Text>
      <Text style={styles.regularText}>Light: {plantData["plants"]["tomatoes"]["sunlight"]}</Text>
      <Text style={styles.regularText}>Water: {plantData["plants"]["lettuce"]["water"]}</Text>
      <View style={styles.bottomSection}>
        <Text style={styles.chartText}>Moisture Chart</Text>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          yAxisSuffix={"%"}
          fromZero={true}
          bezier={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sensorText: {
    marginBottom: 5,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 18,
    margin: 20,
  },

  chartText:{
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,

  },

  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },

  regularText: {
    marginBottom: 8,
    marginLeft: 20, 
    marginRight: 20,
  }
});

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#87CEEB",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
};
