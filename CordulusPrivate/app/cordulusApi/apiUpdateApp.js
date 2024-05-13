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

import { readSensorArray, clearAsyncStorage } from "../sensorStorage";
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
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../assets/gardenBed.png")}
            />
          </View>

          <View style={styles.nameContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.regularText}> Gardenbed:</Text>
              <Text style={styles.nameContainerText}> {item.name} </Text>
            </View>

            <View style={styles.columnContainer}>
              <Text style={styles.regularText}> Plants:</Text>
              <Text style={styles.nameContainerText}>
                {" "}
                {item.plants.join(", ")}{" "}
              </Text>
            </View>
          </View>

          <View style={styles.sensorContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.regularSensorText}> SensorID:</Text>
              <Text style={styles.itemData}> {item.id} </Text>
            </View>

            <View style={styles.rowContainer}>
              <Text style={styles.regularSensorText}> Temperature:</Text>
              <Text style={styles.itemData}> {item.temperature} </Text>
            </View>

            <View style={styles.rowContainer}>
              <Text style={styles.regularSensorText}> Humidity:</Text>
              <Text style={styles.itemData}> {item.humidity} </Text>
            </View>

            <View style={styles.rowContainer}>
              <Text style={moistureTextStyle}> Moisture:</Text>
              <Text style={styles.itemData}> {item.moisture} </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => clearAsyncStorage()}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgrey" />
      <Text style={styles.headerText}>My Plants</Text>
      <FlatList
        style={{ marginBottom: 130 }}
        data={postData}
        renderItem={renderItem}
        keyExtractor={generateRandomNumber} // Unique key for each item
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity
        style={styles.touchButton}
        onPress={() => fetchData()}
      >
        <Text style={styles.buttonText}>Update All</Text>
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

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 18,
    marginTop: 18,
  },

  regularText: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
  },

  lowMoistureText: {
    color: "red",
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
  },

  rowContainer: {
    flexDirection: "row",
  },
  columnContainer: {
    flexDirection: "column",
  },

  touchButton: {
    backgroundColor: "black",
    width: 120,
    height: 70,
    borderRadius: 20,
    position: "absolute", // Remove from normal flow
    bottom: 32, // Position from bottom
    right: 20, // Position from right
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },

  deleteButton: {
    backgroundColor: "white",
    width: 18,
    height: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    position: "absolute", // Remove from normal flow
    right: 10, // Position from right
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
  deleteButtonText: {
    fontSize: 8,
    color: "red",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },

  highMoistureText: {
    color: "blue",
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
  },

  itemData: {
    position: "absolute", // Remove from normal flow
    right: 10, // Position from right
    fontSize: 18,
    color: "#0C2340",
  },

  regularSensorText: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0C2340",
  },

  sensorContainer: {
    marginTop: 18,
    backgroundColor: "#B0C4DE",

    borderRadius: 10,
    paddingTop: 8,
    paddingLeft: 8,
  },
  nameContainer: {
    backgroundColor: "#E1EBEE",
    paddingTop: 8,
    paddingLeft: 8,
    borderRadius: 10,
  },

  nameContainerText: {
    position: "absolute", // Remove from normal flow
    right: 10, // Position from right
    fontSize: 18,
  },
});
