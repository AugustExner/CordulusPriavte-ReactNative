import React from "react";
import { SafeAreaView } from "react-native";
import CordulusData from "./components/CordulusData";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CordulusData />
    </SafeAreaView>
  );
}
