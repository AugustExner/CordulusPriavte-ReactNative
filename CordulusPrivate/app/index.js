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
import AntDesign from "react-native-vector-icons/AntDesign";

export default function HomePage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F2F2F2" />
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}>Cordulus </Text>
        <Text style={styles.titleText}>Private</Text>
        <Text style={styles.baseText}>Rethinking Irrigation </Text>
      </View>

      <TouchableOpacity
        style={styles.touchButtonMyPlants}
        onPress={() => router.push("./cordulusApi/apiUpdateApp")}
      >
        <Text style={styles.plantsText}>Garden Beds</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchButton}
        onPress={() => router.push("./addBed")}
      >
        <AntDesign name="plus" style={styles.buttonText}/>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 18,
    alignContent: "center",
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 400,
  },
  titleText: {
    color: "hsl(159, 60%, 20%)",
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: -20,
    
  },
  baseText: {
    color: "#222222",
    fontSize: 24,
    fontWeight: "regular",
    marginTop: 0,
    lineHeight: 40,
  },
  buttonStyle: {
    justifyContent: "flex-end",
  },
  touchButton: {
    backgroundColor: 'hsl(159, 60%, 20%)',
    width: 70,
    height: 70,
    borderRadius: 20, // Set diameter as width and round corners for circle
    position: "absolute", // Remove from normal flow
    bottom: 32, // Position from bottom

    right: 20, // Position from right
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },

  touchButtonMyPlants: {
    backgroundColor: "hsl(159, 60%, 20%)",
    width: 240,
    height: 70,
    borderRadius: 20, // Set diameter as width and round corners for circle
    position: "absolute", // Remove from normal flow
    bottom: 32, // Position from bottom
    left: 20, // Position from right
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },

  plantsText:{
    fontSize: 24,
    color: '#F2F2F2',
    fontWeight: "regular",
  },

  buttonText: {
    fontSize: 40,
    color: '#F2F2F2',
    fontWeight: "bold",
  },

});
