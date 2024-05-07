import {
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";

import ContinueButton from "../../components/continueButton";

import { readSensorArray, clearAsyncStorage } from "../sensorStorage";

import { Link, router } from "expo-router";
import { useState, useEffect, useCallback, useId } from "react";

export default function updateAppPost() {
  const [refreshing, setRefreshing] = useState(false);
  const [postData, setPostData] = useState(null); // State to store API response

  generateRandomNumber = () => {
    const min = 1;
    const max = 1000000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };

  const fetchData = async () => {
    const data = await readSensorArray();
    if (data) {
      setPostData(data);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("PostData--->", postData);
  }, [postData]);

  const renderItem = ({ item }) => {
    // Define a threshold for low moisture level
    const lowMoistureThreshold = 30;
    const highMoistureThreshold = 60;

    // Determine the style for moisture text based on the moisture level
    let moistureTextStyle = styles.regularText;

    if (item.moisture < lowMoistureThreshold) {
      moistureTextStyle = styles.lowMoistureText;
    } else if (item.moisture > highMoistureThreshold) {
      moistureTextStyle = styles.highMoistureText;
    }
    return (
      <View style={styles.postContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.plantText}>Species: {item.plants}</Text>
          <Text style={styles.regularText}> SensorID: {item.id}</Text>
          <Text style={styles.regularText}>
            Temperature: {item.temperature}{" "}
          </Text>
          <Text style={styles.regularText}> Humidity: {item.humidity}</Text>

          <View style={styles.rowContainer}>
            <Text style={moistureTextStyle}> Moisture: {item.moisture}</Text>
            <Image
              style={styles.image}
              source={require("../../assets/gardenBed.png")}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgrey" />
      <Text style={styles.headerText}>My Plants</Text>
      <FlatList
        style={{ marginBottom: 120 }}
        data={postData}
        renderItem={renderItem}
        keyExtractor={generateRandomNumber} // Unique key for each item
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity
        style={styles.touchButton}
        onPress={() => clearAsyncStorage()}
      >
        <Text style={styles.buttonText}>Delete All</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
  postContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    width: 320,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 18, // Add margin between cards if needed
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },

  headerText: {
    marginBottom: 24,
    marginTop: 24,
    fontWeight: "bold",
    fontSize: 18,
  },

  plantText: {
    marginBottom: 5,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 18,
  },

  image: {
    width: 24,
    height: 24,
    marginLeft: 170,
  },

  regularText: {
    marginBottom: 8,
    fontSize: 16,
  },

  lowMoistureText: {
    color: "red",
    fontSize: 16,
  },
  highMoistureText: {
    color: "blue",
    fontSize: 16,
  },

  rowContainer: {
    flexDirection: "row",
  },

  touchButton: {
    backgroundColor: "black",
    width: 120,
    height: 70,
    borderRadius: 20, // Set diameter as width and round corners for circle

    position: "absolute", // Remove from normal flow
    bottom: 32, // Position from bottom

    right: 20, // Position from right
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
