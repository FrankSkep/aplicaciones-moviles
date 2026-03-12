import { View, Text, StyleSheet } from "react-native";

import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";

export default function Giroscopio() {
  const [data, setData] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });
    
    useEffect(() => {
        Gyroscope.setUpdateInterval(100);

        const subscription = Gyroscope.addListener((gyroscopeData) => {
            setData(gyroscopeData);
        });

        return () => subscription.remove();
    }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Giroscopio</Text>
          <Text>X: {data.x.toFixed(3)} rad/s</Text>
          <Text>Y: {data.y.toFixed(3)} rad/s</Text>
          <Text>Z: {data.z.toFixed(3)} rad/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  axisLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  bar: {
    height: 20,
    backgroundColor: "#0f766e",
    marginRight: 10,
  },
});
