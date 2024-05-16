import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, Button } from "react-native";
import { Dimensions, Linking } from "react-native";
import { LineChart } from "react-native-chart-kit";
import plantData from "../../assets/plants.json";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";

export default function plantDetailsScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [clickedValue, setClickedValue] = useState(null);
  const [clickedDate, setClickedDate] = useState(null);

  const screenWidth = Dimensions.get("window").width;
  const {plantName, history, forecast} = useLocalSearchParams();

  const { sunlight, water, soil, season } = getPlantData(plantName);

  let readings = JSON.parse(history);
  let rain = JSON.parse(forecast);

  console.log("Chart");

  //get the dates of the chart
  const days = [-3, -2, -1, 0, 1, 2, 3];
  const relativeDates = days.map(day => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    return date.toISOString().substring(0,10);
  });

  console.log("chart days: " + relativeDates);
 
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
  console.log("moisture: " + moistureByDate);

  // Calculate average moisture value for each day
  const averageMoistureByDate = {};
  Object.keys(moistureByDate).forEach(date => {
    const moistureValues = moistureByDate[date];
    const averageMoisture = _.mean(moistureValues);
    averageMoistureByDate[date] = averageMoisture;
  });
  console.log("avg moist: " + averageMoistureByDate);

  //
  const rainByDate = {};
  rain.forEach(reading => {
    const readingDate = reading.timestamp.substring(0, 10);
    if (relativeDates.slice(4,7).includes(readingDate)) {
    if (!rainByDate[readingDate]) {
        rainByDate[readingDate] = 0;
      }
        rainByDate[readingDate] += reading.rain;
    }
  });
  console.log("rain: " + rainByDate);


  const rainToMoisture = {};
  for (const date in rainByDate) {
    rainToMoisture[date] = rainByDate[date] * 0.4;
  }
  console.log("rainToMoisture:" + rainToMoisture);


  // Calculate the difference between yesterday (-1) and today (0)
  const yesterdayMoisture = averageMoistureByDate[relativeDates[2]]; // Index 2 corresponds to -1
  const todayMoisture = averageMoistureByDate[relativeDates[3]]; // Index 3 corresponds to 0
  const difference = todayMoisture - yesterdayMoisture;

  const predictedMoisture = {
    [relativeDates[4]]: todayMoisture + difference + rainToMoisture[relativeDates[4] || 0], // Index 4 corresponds to +1
    [relativeDates[5]]: todayMoisture + 2 * difference + rainToMoisture[relativeDates[5] || 0], // Index 5 corresponds to +2
    [relativeDates[6]]: todayMoisture + 3 * difference + rainToMoisture[relativeDates[6] || 0]// Index 6 corresponds to +3
  }


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

  const data = {
    labels: ["-3", "-2","-1", "Today", "+1", "+2", "+3"],
    datasets: [
      {
        data: [
          averageMoistureByDate[relativeDates[0]] || null, // -3
          averageMoistureByDate[relativeDates[1]] || null, // -2
          averageMoistureByDate[relativeDates[2]] || null, // -1
          averageMoistureByDate[relativeDates[3]] || null, // Today (0)
          predictedMoisture[relativeDates[4]], // +1
          predictedMoisture[relativeDates[5]], // +2
          predictedMoisture[relativeDates[6]] // +3
        ],
        color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
        strokeWidth: 2,
      }
    ],
    legend: ["Daily Average Moisture"]
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
      <View style={styles.icon}>
      <TouchableOpacity onPress={() => {
        const lowerCasedPlantName = plantName.charAt(0).toLowerCase() + plantName.slice(1);
        const dyrkSearchUrl = `https://dyrk.nu/afgroeder/${lowerCasedPlantName}`;
        Linking.openURL(dyrkSearchUrl);
      }}>
          <Image source={require("../../assets/dyrk.nu.png")} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            const googleSearchUrl = `https://www.google.com/search?q=${plantName}`;
            Linking.openURL(googleSearchUrl);
        }}>
          <Image source={require("../../assets/google.png")} style={styles.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            const wikiSearchUrl = `https://da.wikipedia.org/wiki/${plantName}`;
            Linking.openURL(wikiSearchUrl);
        }}>
          <Image source={require("../../assets/Wiki.png")} style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.chartText}>Moisture Chart</Text>
        
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Date: {clickedDate}</Text>
            <Text style={styles.modalText}>Moisture: {clickedValue}%</Text>
            <Text style={styles.miniText}>Predicted moisture: Delta(yesterday-today) + (4* mm rain)</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  icon: {
    flexDirection: "row", // This is already there
    justifyContent: 'flex-end', // Aligns icons to the right
    alignItems: 'flex-end', // Aligns icons to the bottom (already set)
  },

  buttonIcon: {
    borderRadius: 20,
    margin: 2,
    width: 20,
    height: 20,
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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
