import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useLocalSearchParams } from "expo-router";
import _ from "lodash";

export default function plantDetailsScreen() {
  const screenWidth = Dimensions.get("window").width;
  const { history } = useLocalSearchParams();

  let readings = JSON.parse(history);

  // Get unique dates from readings
  const uniqueDates = Array.from(new Set(readings.map(reading => reading.time.substring(0, 10))));

  // Sort dates
  uniqueDates.sort();

  const moistureByDate = {};
  readings.forEach((reading) => {
    const readingDate = reading.time.substring(0, 10);
    if (!moistureByDate[readingDate]) {
      moistureByDate[readingDate] = [];
    }
    moistureByDate[readingDate].push(reading.moisture);
  });

  const averageMoistureByDate = {};
  uniqueDates.forEach((date) => {
    const moistureValues = moistureByDate[date];
    const averageMoisture = _.mean(moistureValues);
    averageMoistureByDate[date] = averageMoisture;
  });

  const data = {
    labels: uniqueDates.map(date => date.substring(8)), // Extracting the day part of the date
    datasets: [
      {
        data: uniqueDates.map(date => averageMoistureByDate[date] || 0),
        color: (opacity = 1) => `rgba(66, 135, 245, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Daily Average Moisture"],
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth - 60}
        height={220}
        chartConfig={chartConfig}
        yAxisSuffix={"%"}
        fromZero={true}
        bezier={true}
        style={styles.lineChart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

const chartConfig = {
  backgroundGradientFrom: "#f2f2f2",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#f2f2f2",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
};
