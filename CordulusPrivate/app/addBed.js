import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  TextInput,
  Switch,
  View,
  Button,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";

export default function addBed() {
  const [plantname, setPlantname] = useState("");
  const [position, setPosition] = useState("");
  const [sensorID, setSensorID] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!plantname) errors.plantname = "Plantname is required";
    if (!position) errors.position = "position is required";
    if (!sensorID) errors.sensorID = "SensorID is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    const bedData = {
      Plantname: plantname,
      Position: position,
      SensorID: sensorID,
    };

    if (validateForm()) {
      console.log("Submitted", plantname, position, sensorID);
      setPlantname("");
      setPosition("");
      setSensorID("");
      setErrors({});
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar backgroundColor="lightgrey" />
      <View style={styles.form}>
        <Image
          style={styles.image}
          source={require("../assets/gardenBed.png")}
        />
        <Text style={styles.label}>Plant name</Text>
        <TextInput
          style={styles.input}
          placeholder="Tomatoes"
          value={plantname} //The displayed value in the TextInput will always be the same as the content of the plantname
          onChangeText={setPlantname} //This updates the State and value of the plantname //value={plantname} makes sure the input displays the state, and onChangeText={setUsername} updates the state when the input changes.
        ></TextInput>
        {errors.plantname ? (
          <Text style={styles.errorText}>{errors.plantname}</Text>
        ) : null}
        <Text style={styles.label}>Position</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude, Longitude"
          value={position}
          onChangeText={setPosition}
        ></TextInput>
        {errors.position ? (
          <Text style={styles.errorText}>{errors.position}</Text>
        ) : null}
        <Text style={styles.label}>Sensor ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Sensor 1"
          value={sensorID}
          onChangeText={setSensorID}
        ></TextInput>
        {errors.sensorID ? (
          <Text style={styles.errorText}>{errors.sensorID}</Text>
        ) : null}

        <Button
          title="Add garden bed"
          color="black"
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "lightgrey",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 15,
    padding: 10,
    borderRadius: 4,
  },
  image: {
    width: 300,
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
