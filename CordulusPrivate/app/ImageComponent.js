import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function ImageComponent({ setImage }) {
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.cameraIconContainer}>
          <TouchableOpacity style={styles.circularButton} onPress={takePhoto}>
            <Feather name="camera" style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.uploadIconContainer}>
          <TouchableOpacity style={styles.circularButton} onPress={pickImage}>
            <AntDesign name="picture" style={styles.uploadIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Add styles here or import from elsewhere
const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    marginTop: 32,
    flex: 1,
    alignItems: "center",
  },

  circularButton: {
    borderRadius: 25, // Adjust button size as needed
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "white",
    width: 50,
    height: 50,
  },
  cameraIcon: {
    fontSize: 30, // Adjust icon size as needed
    color: "black", // Adjust icon color as desired
  },
  uploadIcon: {
    fontSize: 30, // Adjust icon size as
    color: "black",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Distribute icons horizontally
    width: 300,
    height: 200,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  cameraIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 220,
    marginBottom: 80,
  },
  uploadIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 220,
    marginBottom: 80,
  },
});
