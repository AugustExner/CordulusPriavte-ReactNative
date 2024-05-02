import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
let sensorStringArray = [];
let sensorIntArray = [];

export const storeID = async (sensorID) => {
  try {
    console.log("This is the id to be stored: ", sensorID);
    await AsyncStorage.setItem("sensorId", sensorID);
    await storeSensorArray(); // Ensure this is awaited
  } catch (e) {
    console.error("Error storing the sensorId:", e);
  }
};

export const storeSensorArray = async () => {
  try {
    const value = await AsyncStorage.getItem("sensorId");
    if (value !== null) {
      sensorStringArray.push(value); // Now safe to use push, as sensorStringArray is always an array
      console.log("sensorArray: ", sensorStringArray);
      const serializedArray = JSON.stringify(sensorStringArray);
      await AsyncStorage.setItem("sensorArray", serializedArray); // Await this operation
    }
  } catch (e) {
    console.error("Error storing the sensorArray:", e);
  }
};

export const readSensorId = async () => {
  try {
    const value = await AsyncStorage.getItem("sensorId");
    if (value !== null) {
      console.log("latest stored sensorId: ", value);
    }
  } catch (e) {
    console.error("Error reading sensorId:", e); // Log error for consistency
  }
};

export const readSensorArray1 = async () => {
  try {
    const value = await AsyncStorage.getItem("sensorArray");
    if (value !== null) {
      console.log("Key: sensorArray = ", value);
      sensorStringArray = JSON.parse(value); // Parse JSON to convert string back to array
      sensorIntArray = sensorStringArray.map(Number);

      //console.log("sensorStringArray: ", sensorStringArray);
      //console.log("sensorIntArray: ", sensorIntArray);
      //console.log("updateAppPost");
      //updateAppPost(); // DATA
      return updateAppPost();
    }
  } catch (e) {
    console.error("Error reading sensorArray:", e); // Log error for consistency
  }
};

export const readSensorArray = async () => {
  try {
    const value = await AsyncStorage.getItem("sensorArray");
    if (value !== null) {
      sensorStringArray = JSON.parse(value);
      sensorIntArray = sensorStringArray.map(Number);
      return updateAppPost();
    }
    return null;  // Ensure you return null or an empty array if no data is found
  } catch (e) {
    console.error("Error reading sensorArray:", e);
    return null;  // Ensure error handling returns null or an appropriate value
  }
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    sensorIntArray = [];
    sensorStringArray = [];
    console.log("AsyncStorage has been cleared!");
    console.log("SensorIntArray", sensorIntArray);
    console.log("SensorStringArray", sensorStringArray);
  } catch (e) {
    console.error("Failed to clear the async storage:", e);
  }
};

export const updateAppPost = async () => {
  try {
    const response = await fetch("http://165.22.75.121:3000/updateApp", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        sensors: sensorIntArray,
      }),
    });
    console.log("respons: ", response);

    console.log(
      JSON.stringify({
        sensors: sensorIntArray,
      })
    );
    // Check for successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // Handle the successful response with data
    console.log("Post added successfully:");
    console.log(data);

    return data; // Return the received data
  } 
  
  catch (error) {
    console.error("Error adding post:", error);
    // Handle errors here, for example, display an error message to the user
  }
};
