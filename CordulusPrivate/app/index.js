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
        text="API GET"
        onPress={() => router.push("./cordulusApi/apiGet")}
      ></ContinueButton>
      <ContinueButton
        text="API POST"
        onPress={() => router.push("./cordulusApi/apiPost")}
      ></ContinueButton>
      <ContinueButton
        text="UpdateApp POST"
        onPress={() => router.push("./cordulusApi/apiUpdateApp")}
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
