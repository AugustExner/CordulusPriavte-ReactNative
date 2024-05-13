import { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ImageComponent() {
  const [image, setImage] = useState(null);
  


const takePhoto = async () => {
  const { status } = await ImagePicker.getCameraPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera permissions to make this work!');
    return;
  }
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      aspect: [4, 3],
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.uri);
    }
  } catch (error) {
    console.log("Error occurred while launching the camera: ", error);
  }
};

    
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.circularButton} onPress={takePhoto}>
          <Feather name="camera" style={styles.cameraIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circularButton} onPress={pickImage}>
          <AntDesign name="picture" style={styles.uploadIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 50,
  },
  circularButton: {
    borderRadius: 50, // Adjust button size as needed
    padding: 10, // Adjust padding based on icon size preference
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    backgroundColor: 'red',
    width: 50,
    height: 50,
    zIndex: 2,
    
  },
  cameraIcon: {
    fontSize: 30, // Adjust icon size as needed
    color: 'black', // Adjust icon color as desired
  },
  uploadIcon: {
    fontSize: 30, // Adjust icon size as
    color: 'black',
  },

  iconContainer:{
    flex: 1,
    flexDirection:'row',
  }

});