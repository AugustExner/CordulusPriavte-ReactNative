import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function TagInputComponent({ tags, setTags }) {
    const [text, setText] = useState("");
    const [editIndex, setEditIndex] = useState(null);
  
    const addTag = () => {
      if (text.trim() !== "") {
        if (editIndex !== null) {
          const newTags = [...tags];
          newTags[editIndex] = text.trim();
          setTags(newTags);
          setEditIndex(null);
        } else {
          setTags([...tags, text.trim()]);
        }
        setText("");
      }
    };

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const editTag = (index) => {
    const tagToEdit = tags[index];
    setText(tagToEdit);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tagWrapper}>
            <TouchableOpacity onPress={() => editTag(index)} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => removeTag(index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add plants"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTag}
        />
        <TouchableOpacity onPress={addTag} style={styles.addButton}>
          <Text style={styles.buttonText}>
            {editIndex !== null ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  container: {
    width: "100%",
    paddingHorizontal: 0,
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 0,
  },
  tagWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginRight: 5,
  },
  tag: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: "black",
  },
  tagText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
  },
  removeButton: {
    marginLeft: 5,
    padding: 3,
    borderRadius: 5,
    backgroundColor: "black",
    borderWidth: 3,
    borderColor: "black",
  },
  removeButtonText: {
    color: "white",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "green",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
