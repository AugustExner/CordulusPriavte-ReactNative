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
  TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { storeID } from "./sensorStorage";
import TagInputComponent from "./tagsInput";

import ImageComponent from "./ImageComponent";

export default function addBed() {
  const [plantname, setPlantname] = useState("");
  const [gardenbedName, setgardenbedName] = useState("");
  const [position, setPosition] = useState("");
  const [sensorID, setSensorID] = useState("");
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState();
  const [isPosting, setIsPosting] = useState(false);
  const [tags, setTags] = useState([]);

  const [gardenImage, setGardenImage] = useState(null);

  const [localURI, setLocalURI] = useState();




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
          image: localURI,
        }),
      });

      console.log(
        JSON.stringify({
          name: gardenbedName,
          id: parseInt(sensorID),
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          plants: tags,
          image: localURI,
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
  }, []); // Add dependency array to prevent infinite loop

  const validateForm = () => {
    let errors = {};

    if (!gardenbedName.trim())errors.gardenbedName = "Gardenbed name is required";

    if (!sensorID.trim()) errors.sensorID = "Sensor ID is required";

    if (!tags.length) errors.tags = "At least one plant tag is required";

    if(!gardenImage) errors.image = "You need to add an image "



    setErrors(errors);
    return Object.keys(errors).length === 0; // This should return true if there are no errors
  };

  useEffect(() => {
    downloadImage();
  }, [gardenImage]);

  const handleSubmit = async () => {
    try {
      await downloadImage();

      if (validateForm()) {
        storeID(sensorID); // Call the function to store the id
        // Only call addPost if the form is valid
        console.log("Submitted", gardenbedName, tags, position, sensorID);
        await addPost(); // Move the addPost call inside this if block
        setgardenbedName("");
        setTags([]);
        setSensorID("");
        setErrors({});

        router.push("./cordulusApi/apiUpdateApp");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const downloadImage = async () => {
    if (!gardenImage) {
      console.log("No image to download");
      return;
    }
    console.log("GardenImage --> ", gardenImage);
    // Define the file path and name for the saved image
    const fileName = gardenImage.split("/").pop(); // Extract the filename from the URI
    const localUri = `${FileSystem.documentDirectory}${fileName}`;

    try {
      await FileSystem.copyAsync({
        from: gardenImage,
        to: localUri,
      });
      // Log the download result
      console.log("Image downloaded to:", localUri);
      setLocalURI(localUri);
    } catch (error) {
      console.error("Error downloading the image:", error);
      alert("Failed to save image");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar backgroundColor="white" />
      <View style={styles.form}>
        <Image
          style={styles.image}
          source={
            gardenImage
              ? { uri: gardenImage }
              : require("../assets/gardenBed.png")
          }
        />

        <ImageComponent setImage={setGardenImage} />

        {errors.image ? (
          <Text style={styles.errorText}>{errors.image}</Text>
        ) : null}

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

        <TouchableOpacity
          style={styles.touchButton}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.buttonText}>Add Gardenbed/Submit</Text>
        </TouchableOpacity>
        
        
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
    backgroundColor: "white",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "lightgrey",
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
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: "black",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },

  touchButton: {
    backgroundColor: "black",
    height: 50,
    borderRadius: 10, // Set diameter as width and round corners for circle
    borderWidth: 2,
    borderColor: "white",
    bottom: 0, // Position from bottom
    justifyContent: "center",
    marginBottom: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
