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
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { storeID } from "./sensorStorage";
import TagInputComponent from "./tagsInput";

export default function addBed() {
  const [plantname, setPlantname] = useState("");
  const [gardenbedName, setgardenbedName] = useState("");
  const [position, setPosition] = useState("");
  const [sensorID, setSensorID] = useState("");
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState();
  const [isPosting, setIsPosting] = useState(false);
  const [tags, setTags] = useState([]);

  // A function to expose tags if needed elsewhere
  const getTagsArray = () => {
    return tags;
  };

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const addPost = async () => {
    setIsPosting(true);
    try {
      const response = await fetch("http://165.22.75.121:3000/newGarden", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: gardenbedName,
          id: parseInt(sensorID),
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          plants: tags,
        }),
      });

      console.log(
        JSON.stringify({
          name: gardenbedName,
          id: parseInt(sensorID),
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          plants: tags,
        })
      );
      // Check for successful response
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // Handle the successful response with data
      console.log("Post added successfully:", data);
    } catch (error) {
      console.error("Error adding post:", error);
      // Handle errors here, for example, display an error message to the user
    } finally {
      setIsPosting(false); // Set posting state to false regardless of success or error
    }
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      //console.log("Latitude: " + currentLocation.coords.latitude +" Longitude: " + currentLocation.coords.longitude);
    };
    getPermissions();
  });

  const validateForm = () => {
    let errors = {};

    if (!gardenbedName.trim())
      errors.gardenbedName = "Gardenbed name is required";
    if (!sensorID.trim()) errors.sensorID = "Sensor ID is required";
    if (!tags.length) errors.tags = "At least one plant tag is required";

    setErrors(errors);
    return Object.keys(errors).length === 0; // This should return true if there are no errors
  };

  const handleSubmit = () => {
    const bedData = {
      name: gardenbedName,
      plants: plantname,
      latitude: location ? location.coords.latitude : null,
      longitude: location ? location.coords.longitude : null,
      id: sensorID,
    };
    console.log("bedData");
    console.log(bedData);

    storeID(sensorID); // Call the function to store the id

    if (validateForm()) {
      // Only call addPost if the form is valid
      console.log("Submitted", gardenbedName, tags, position, sensorID);
      addPost(); // Move the addPost call inside this if block
      setgardenbedName("");
      setTags([]);
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
        <Text style={styles.label}>Gardenbed</Text>
        <TextInput
          style={styles.input}
          placeholder="Gardenbed 1"
          value={gardenbedName} //The displayed value in the TextInput will always be the same as the content of the plantname
          onChangeText={setgardenbedName} //This updates the State and value of the plantname //value={plantname} makes sure the input displays the state, and onChangeText={setUsername} updates the state when the input changes.
        ></TextInput>
        {errors.gardenbedName ? (
          <Text style={styles.errorText}>{errors.gardenbedName}</Text>
        ) : null}

        <Text style={styles.label}>Plants</Text>
        <TagInputComponent style={styles.input} tags={tags} setTags={setTags} />

        {errors.tags ? (
          <Text style={styles.errorText}>{errors.tags}</Text>
        ) : null}

        <Text style={styles.label}>Sensor ID</Text>
        <TextInput
          style={styles.input}
          placeholder="1"
          value={sensorID}
          onChangeText={setSensorID}
          keyboardType="numeric"
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

//STYLE///
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
