import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  StatusBar,
  Button,
} from "react-native";
import { Link, router } from "expo-router";

import {
  readSensorId,
  readSensorArray,
  clearAsyncStorage,
} from "./sensorStorage";
import ContinueButton from "../components/continueButton";
import addBed from "./addBed";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgrey" />
      <Text style={styles.titleText}>Cordulus </Text>

      <Text style={styles.titleText}>Private</Text>
      <Text style={styles.baseText}>Rethinking Irrigation </Text>
      <ContinueButton
        text="Add Garden Bed"
        onPress={() => router.push("/addBed")}
      ></ContinueButton>
      <ContinueButton
        text="API GET"
        onPress={() => router.push("./cordulusApi/apiGet")}
      ></ContinueButton>

      <ContinueButton
        text="UpdateApp POST"
        onPress={() => router.push("./cordulusApi/apiUpdateApp")}
      ></ContinueButton>
      <Button
        title="Read sensor data"
        color="blue"
        onPress={() => {
          readSensorId();
          readSensorArray();
        }}
      />
      <Button
        title="Clear async storage"
        color="red"
        onPress={() => {
          clearAsyncStorage();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 18,
  },
  titleText: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: -20,
  },
  baseText: {
    fontSize: 24,
    fontWeight: "regular",
    marginTop: 0,
  },
});
