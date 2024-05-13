import React from "react";
import { View, Text, Image, StyleSheet, } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import plantData from "../../assets/plants.json";
import { useLocalSearchParams } from "expo-router";

export default function plantDetailsScreen() {

  const screenWidth = Dimensions.get("window").width;
  const {plantName, history} = useLocalSearchParams();

  console.log(history);

  function getPlantData(plantName) {
    const lowerCaseName = plantName.toLowerCase();
    for (const key in plantData["plants"]) {
      if (key.toLowerCase().includes(lowerCaseName)) {
        return {
          sunlight: plantData["plants"][key]["sunlight"],
          water: plantData["plants"][key]["water"],
        };
      }
    }
    return { 
      sunlight: "Data not available",
      water: "Data not available",
    };
  }
  
  const { sunlight, water } = getPlantData(plantName);

  const data = {
    labels: ["-3", "-2","-1", "Today", "+2", "+3", "+4", "+5"],
    datasets: [
      {
        data: [20, 45, 28, 80, 59, 43, 60, 48],
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
      <View style={styles.card}>
      <Text style={styles.sensorText}>{plantName.toUpperCase().charAt(0) + plantName.slice(1)}</Text>
      <Text style={styles.boldText}>Sun requirements:</Text>
      <Text style={styles.regularText}>{sunlight}</Text>
      <Text style={styles.boldText}>Water requirements:</Text>
      <Text style={styles.regularText}>{water}</Text>
      </View>
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

  card: {
    backgroundColor: "#fff", // White background
    borderRadius: 10, // Rounded corners
    padding: 5, // Padding for content
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, // Adjust shadow blur
    elevation: 5, // Elevation for a more lifted card effect (Android)
    marginHorizontal: 15,
  },

  chartText:{
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,

  },

  boldText:{
    fontWeight: "bold",
    marginLeft: 20,
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
