import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="lightgrey" />
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Cordulus </Text>
        <Text style={styles.titleText}>Private</Text>
        <Text style={styles.baseText}>Rethinking Irrigation </Text>
      </View>

      <TouchableOpacity
        style={styles.touchButtonMyPlants}
        onPress={() => router.push("./cordulusApi/apiUpdateApp")}
      >
        <Text style={styles.buttonText}>My plants</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchButton}
        onPress={() => router.push("./addBed")}
      >
        <Text style={styles.buttonText}>Add +</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 18,
    alignContent: "center",
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 400,
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
  buttonStyle: {
    justifyContent: "flex-end",
  },
  touchButton: {
    backgroundColor: "green",
    width: 70,
    height: 70,
    borderRadius: 20, // Set diameter as width and round corners for circle
    borderWidth: 3,
    borderColor: "black",
    position: "absolute", // Remove from normal flow
    bottom: 32, // Position from bottom

    right: 20, // Position from right
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },

  touchButtonMyPlants: {
    backgroundColor: "white",
    width: 240,
    height: 70,
    borderRadius: 20, // Set diameter as width and round corners for circle
    borderWidth: 3,
    borderColor: "black",
    position: "absolute", // Remove from normal flow
    bottom: 32, // Position from bottom
    left: 20, // Position from right
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
});
