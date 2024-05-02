import {
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
} from "react-native";

import { readSensorArray } from "../sensorStorage";

import { Link, router } from "expo-router";
import { useState, useEffect, useCallback } from "react";

export default function updateAppPost() {
  const [refreshing, setRefreshing] = useState(false);
  const [postData, setPostData] = useState(null); // State to store API response

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgrey" />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
        {postData && renderPostData(postData)}
      </ScrollView>
    </SafeAreaView>
  );
}

const renderPostData = (data) => {
  return (
    <View>
      {data.map((item, index) => (
        <View key={index} style={styles.postContainer}>
          <Text style={styles.sensorText}>Plants: {item.plants}</Text>
          <Text>SensorID: {item.id}</Text>
          <Text>Temperature: {item.temperature}</Text>
          <Text>Humidity: {item.humidity}</Text>
          <Text>Moisture: {item.moisture}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
  postContainer: {
    backgroundColor: "white",
    padding: 10,
    width: 300,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 16, // Add margin between cards if needed
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
  }
});
