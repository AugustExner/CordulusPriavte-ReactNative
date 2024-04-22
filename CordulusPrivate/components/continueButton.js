import { Pressable, Text, View, StyleSheet } from "react-native";

export default function ContinueButton({ onPress, text }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure it fills the container vertically
    justifyContent: "flex-end", // Aligns child to the bottom
    alignItems: "center", // Keeps the button centered horizontally
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "black",
    width: "100%", // Makes the button take full width of the container
    padding: 18,
    marginBottom: 64, // Bottom padding outside the button
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
