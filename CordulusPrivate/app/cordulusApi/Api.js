import React from "react";
import { Text, SafeAreaView,} from "react-native";
import CordulusData from "../../components/CordulusData";
import ContinueButton from "../../components/continueButton";

export default function Api() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CordulusData />
    </SafeAreaView>
  );
}
