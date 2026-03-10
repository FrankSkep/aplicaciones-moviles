import { useState } from "react";
import * as Location from "expo-location";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function BuscarCoordenadas() {
  const [address, setAddress] = useState<string | null>(null);
  const [coordenadas, setCoordenadas] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const geocodeAdress = async () => {
    try {
      const result = await Location.geocodeAsync(address || "");

      if (result.length > 0) {
        const { latitude, longitude } = result[0];
        setCoordenadas({
          lat: latitude,
          lon: longitude,
        });
      } else {
        setErrorMsg("No se encontraron coordenadas para esta dirección");
      }
    } catch (error) {
      setErrorMsg("Error al geocodificar la dirección");
      Alert.alert("Error", `Error al geocodificar la dirección: ${error}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Buscar Coordenadas
      </Text>
      <TextInput
        style={{
          width: "80%",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Ingresa una dirección"
        value={address || ""}
        onChangeText={setAddress}
      />
      <Button title="Buscar" onPress={geocodeAdress} />
      {coordenadas && (
        <View style={{ marginTop: 20 }}>
          <Text>Latitud: {coordenadas.lat}</Text>
          <Text>Longitud: {coordenadas.lon}</Text>
        </View>
      )}
      {errorMsg && (
        <Text style={{ color: "red", marginTop: 10 }}>{errorMsg}</Text>
      )}

      {/* <View style={StyleSheet.dataContainer}>
        <Text style={styles.axisLabel}>X: </Text>
        <View style={[styles.bar, { width: Math.abs(x) * 100 }]}></View>
        <Text>{x.toFixed(3)}</Text>
      </View> */}
    </View>
  );
}
