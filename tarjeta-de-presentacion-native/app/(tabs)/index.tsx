import BusinessCard from "@/components/business-card";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <BusinessCard />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#232946",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
});
