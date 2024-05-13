import React from "react";
import { View, Text, Image, StyleSheet, } from "react-native";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import plantData from "../../assets/plants.json";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";

export default function plantDetailsScreen() {

  const screenWidth = Dimensions.get("window").width;
  const {plantName, history} = useLocalSearchParams();

  let readings = JSON.parse(history);
  const now = new Date().toISOString().substring(0,10);
  const days = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

  console.log("plant details");
  console.log("today:" + now);

  const relativeDates = days.map(day => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    return date.toISOString().substring(0,10);
  });

  console.log(relativeDates);
 
  // Iterate through readings and group moisture values by date
const moistureByDate = {};
readings.forEach(reading => {
  const readingDate = reading.time.substring(0, 10);
  if (relativeDates.includes(readingDate)) {
    if (!moistureByDate[readingDate]) {
      moistureByDate[readingDate] = [];
    }
    moistureByDate[readingDate].push(reading.moisture);
  }
});

console.log(moistureByDate);

// Calculate average moisture value for each day
const averageMoistureByDate = {};
Object.keys(moistureByDate).forEach(date => {
  const moistureValues = moistureByDate[date];
  const averageMoisture = _.mean(moistureValues);
  averageMoistureByDate[date] = averageMoisture;
});

console.log(averageMoistureByDate);


  function getPlantData(plantName) {
    const lowerCaseName = plantName.toLowerCase();
    for (const key in plantData["plants"]) {
      if (key.toLowerCase().includes(lowerCaseName)) {
        return {
          sunlight: plantData["plants"][key]["sunlight"],
          water: plantData["plants"][key]["water"],
          soil: plantData["plants"][key]["soil"],
          season: plantData["plants"][key]["season"]
        };
      }
    }
    return { 
      sunlight: "Data not available",
      water: "Data not available",
      soil: "Data not available",
      season: "Data not available",
    };
  }
  
  const { sunlight, water, soil, season } = getPlantData(plantName);

  const data = {
    labels: ["-3", "-2","-1", "Today", "+2", "+3", "+4", "+5"],
    datasets: [
      {
        data: relativeDates.map(date => averageMoistureByDate[date] || null),
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
      <Text style={styles.boldText}>Sun:</Text>
      <Text style={styles.regularText}>{sunlight}</Text>
      <Text style={styles.boldText}>Water:</Text>
      <Text style={styles.regularText}>{water}</Text>
      <Text style={styles.boldText}>Soil:</Text>
      <Text style={styles.regularText}>{soil}</Text>
      <Text style={styles.boldText}>Season:</Text>
      <Text style={styles.regularText}>{season}</Text>
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
    backgroundColor: "#fff",
    borderRadius: 10, 
    padding: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
    elevation: 5, 
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
