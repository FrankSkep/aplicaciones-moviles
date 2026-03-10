import { useEffect, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

import {
  Accelerometer,
  Barometer,
  DeviceMotion,
  Gyroscope,
  LightSensor,
  Magnetometer,
  MagnetometerUncalibrated,
  Pedometer,
} from "expo-sensors";

export default function Sensores() {
  const [data, setData] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

    const [subscriptor, setSubscriptor] = useState<any>(null);

    useEffect(() => {
        _subscribe();
        return () => {
            _unsubscribe();
        };
    }, []);
    
    const _subscribe = () => {
        Accelerometer.setUpdateInterval(100);

        const sub = Accelerometer.addListener((accelerometerData) => {
            setData(accelerometerData);
        });

        setSubscriptor(sub);
    }

    const _unsubscribe = () => {
        subscriptor?.remove();
        setSubscriptor(null);
    }

    const {x, y, z} = data;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Sensores</Text>
      <Text>X: {x.toFixed(2)}</Text>
      <Text>Y: {y.toFixed(2)}</Text>
      <Text>Z: {z.toFixed(2)}</Text>
    </View>
  );
}
