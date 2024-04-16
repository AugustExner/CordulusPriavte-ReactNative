import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
} from "react-native";

import { useState, useEffect } from "react";

export default function CordulusData() {
  const key = "aa149d68-f7be-493e-a827-fc9e6ebd5155";
  const [postList, setPostList] = useState([]);

  const fetchData = async (limit = 10, timeout = 10000) => {
    try {
      const response = await Promise.race([
        fetch("http://192.168.192.141:3000/devices"),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeout)
        ),
      ]);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      setPostList(data["devices"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call fetchData when component mounts or whenever needed
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          renderItem={({ item }) => {
            // Destructure the current measurements from each item
            const { label, current } = item;
            // Guard against undefined current before trying to access further details
            const airTemp = current ? current.airTemp : "No data";
            const timeStamp = current ? current.timestamp : "No data";

            const avgWindSpeed = current ? current.windSpeed.avg : "No data";
            const maxWindSpeed = current ? current.windSpeed.max : "No data";
            const rain10m =
              current && current.rain ? current.rain["10m"] : "No data";
            const rain1h =
              current && current.rain ? current.rain["1h"] : "No data";
            const rain24h =
              current && current.rain ? current.rain["24h"] : "No data";

            return (
              <View style={styles.card}>
                <Text style={styles.titleText}>Label: {label}</Text>
                <Text style={styles.bodyText}>
                  Current TimeStamp: {timeStamp}
                </Text>
                <Text style={styles.bodyText}>Current airTemp: {airTemp}</Text>
                <Text style={styles.bodyText}>
                  Avg Wind Speed (10min): {avgWindSpeed}
                </Text>
                <Text style={styles.bodyText}>
                  Max Wind Speed (10min): {maxWindSpeed}
                </Text>
                <Text style={styles.bodyText}>Rain (10m): {rain10m}</Text>
                <Text style={styles.bodyText}>Rain (1h): {rain1h}</Text>
                <Text style={styles.bodyText}>Rain (24h): {rain24h}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight,
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "white",
    padding: 32,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16, // Add margin between cards if needed
  },
  titleText: {
    fontSize: 30,
  },
  bodyText: {
    fontSize: 24,
    color: "#666666",
  },
});
