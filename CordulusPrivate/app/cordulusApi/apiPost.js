import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect } from "react";



export default function apiPost() {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const addPost = async () => {
    setIsPosting(true);
  
    try {
      const response = await fetch("http://165.22.75.121:3000/newGarden", {
        method: 'post',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: parseInt(postTitle),
          latitude: parseInt(postBody),
          longitude: parseInt(postBody),
        }),
      });
  
      console.log(JSON.stringify({
        id: parseInt(postTitle),
        lattitude: parseInt(postBody),
        longitude: parseInt(postBody),
      }))
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

  return (
    <SafeAreaView style={styles.container}>
      <Text>API Post</Text>
      <>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Post Title"
            value={postTitle}
            onChangeText={setPostTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Post Body"
            value={postBody}
            onChangeText={setPostBody}
          />
          <Button
            title={isPosting ? "Adding..." : "Add Post"}
            onPress={addPost}
            disabled={isPosting}
          />
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  inputContainer: {
    inputContainer: "white",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    margin: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
});
