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
} from "react-native";

import { readSensorArray } from "../sensorStorage";

import { Link, router } from "expo-router";
import { useState, useEffect, useCallback, useId } from "react";

export default function updateAppPost() {
  const [refreshing, setRefreshing] = useState(false);
  const [postData, setPostData] = useState(null); // State to store API response

  generateRandomNumber = () => {
    const min = 1;
    const max = 10000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };

  let id = 0;
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

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.sensorText}>Plants: {item.plants}</Text>
      <Text style = {styles.regularText}> SensorID: {item.id}</Text>
      <Text style = {styles.regularText}> Temperature: {item.temperature}</Text>
      <Text style = {styles.regularText}> Humidity: {item.humidity}</Text>
      <Text style = {styles.regularText}> Moisture: {item.moisture}</Text>
      <Image
          style={styles.image}
          source={require("../../assets/gardenBed.png")}
        />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgrey" />
      <FlatList
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
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
  postContainer: {
    backgroundColor: "white",
    padding: 10,
    width: 380,
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

  sensorText: {
    marginBottom: 5,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "flex-end",
    fontSize: 18,
  },

  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },

  regularText: {
    marginBottom: 8, 
  }
});
