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
  Alert,
} from "react-native";
import { router } from "expo-router";
import { deleteGardenbed } from "./apiDelete";
import { readSensorArray, clearAsyncStorage } from "../sensorStorage";
import { useState, useEffect, useCallback, useId } from "react";
import { ScreenWidth } from "react-native-elements/dist/helpers";

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

  const deleteButtonAlert = (id, garden) =>
    Alert.alert("Delete Gardenbed", garden, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "DELETE",
        onPress: () => deleteGardenbed(id).then(() => fetchData()),
      },
    ]);

  const forecastingRain = () => {
    const today = new Date();
    const date = today.toISOString().substring(0, 10);
    console.log(date);
  };

  const TopBorder = () => {
    return <View style={styles.topBorder} />;
  };

  const renderItem = ({ item }) => {
    const todaysRain = [];
    const today = new Date();
    const date = today.toISOString().substring(0, 10);
    //console.log(date);

    let reading = item.forecast;
    //console.log("Reading", reading.forecast)
    reading.forEach((object) => {
      const readingDate = object.timestamp.substring(0, 10);
      //  console.log(readingDate);

      if (readingDate.includes(date)) {
        if (!todaysRain[readingDate]) {
          todaysRain[readingDate] = [];
        }
        //  console.log("object.rain -->", object.rain);
        todaysRain.push(object.rain);
      }
    });
    //console.log("TodaysRain-->", todaysRain);

    let totalRain = 0;

    for (let i = 0; i < todaysRain.length; i++) {
      totalRain += todaysRain[i];
    }

    console.log(totalRain);

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
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "./plantDetailsScreen",
                  params: {
                    plantName: item.plants,
                    history: JSON.stringify(item.history),
                    forecast: JSON.stringify(item.forecast),
                    imageUri: item.imageUri,
                    gardenBedName: item.name,
                    targetMoisture: item.targetMoisture,
                  },
                });
              }}
            >
              <Image style={styles.image} source={{ uri: item.imageUri }} />
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainerBed}>
            <Text style={styles.bedNameText}> {item.name} </Text>
          </View>

          <View style={styles.nameContainer}>
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

            <View style={styles.rowContainer}>
              <Text style={styles.regularSensorText}> Todays rain:</Text>
              <Text style={styles.itemData}> {totalRain} </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            //onPress={() => clearAsyncStorage()}
            onPress={() => {
              deleteButtonAlert(item.id, item.name);
            }}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" />
      <Text style={styles.headerText}>Gardenbeds</Text>

      <TopBorder />
      <FlatList
        style={styles.flatList}
        data={postData}
        renderItem={renderItem}
        keyExtractor={generateRandomNumber} // Unique key for each item
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  postContainer: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 15,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: "lightgrey",
  },
  textContainer: {
    flex: 1,
  },

  headerText: {
    marginBottom: 12,
    marginTop: 24,
    fontWeight: "bold",
    fontSize: 24,
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
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 3,
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
  rowContainerBed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    right: 34, // Position from right
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

  bedNameText: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0C2340",
    alignSelf: "center",
  },

  sensorContainer: {
    marginTop: 18,
    backgroundColor: "#B0C4DE",

    borderRadius: 10,
    paddingTop: 8,
    paddingLeft: 8,
  },

  nameContainer: {
    backgroundColor: "skyblue",
    paddingTop: 8,
    paddingLeft: 8,
    borderRadius: 10,
  },

  nameContainerText: {
    position: "absolute", // Remove from normal flow
    right: 10, // Position from right
    fontSize: 18,
    maxWidth: 200,
  },
  flatList: {
    padding: 10,
  },

  topBorder: {
    width: ScreenWidth, // Ensures full-width border
    height: 1, // Adjust border thickness as needed
    backgroundColor: "lightgrey", // Adjust border color
  },
});
