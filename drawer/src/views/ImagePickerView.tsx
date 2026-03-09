import { Image, Text, TouchableOpacity, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function ImagePickerView() {
  const [imagen, setImagen] = useState<string | null>(null);

  const pickImage = async () => {
    const imagenseleccionada = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!imagenseleccionada.canceled) {
      setImagen(imagenseleccionada.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={pickImage}>
        <Text>Seleccionar Imagen</Text>
      </TouchableOpacity>
      {imagen && (
        <Image source={{ uri: imagen }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}