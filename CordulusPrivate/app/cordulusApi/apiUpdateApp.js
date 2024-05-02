import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
  StatusBar,
  Button,
  RefreshControl,
} from "react-native";

import { Link, router } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { readSensorArray } from "../sensorStorage";

export default function updateAppPost() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    readSensorArray();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
