import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Link, router } from "expo-router";

import ContinueButton from "../components/continueButton";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgrey" />
      <Text style={styles.titleText}>Cordulus </Text>
      
      <Text style={styles.titleText}>Private</Text>
      <Text style={styles.baseText}>Rethinking Irrigation </Text>
      <ContinueButton
        text="Continue"
        onPress={() => router.push("/addBed")}
      ></ContinueButton>
      <ContinueButton
        text="API"
        onPress={() => router.push("./cordulusApi/Api")}
      ></ContinueButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 18,
    justifyContent: "space-between", // Ensures content is spread out vertically
  },
  titleText: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: -20,
  },
  baseText: {
    fontSize: 24,
    fontWeight: "regular",
    marginTop: 30,
  },
});
