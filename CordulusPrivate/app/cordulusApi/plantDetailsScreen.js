import React from "react";
import { View, Text } from "react-native";

export default function plantDetailsScreen({ route }) {
  const { plant } = route.params;
  // Additional logic to fetch and display details for the selected plant
  
  return (
    <View>
      <Text>Plant Details</Text>
      <Text>Name: {plant.plants}</Text>
      {/* Display additional plant details here */}
    </View>
  );
}
