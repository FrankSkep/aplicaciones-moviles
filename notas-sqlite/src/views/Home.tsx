import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Selecciona una opción para continuar.</Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate("Usuarios")}
      >
        <Text style={styles.buttonText}>Gestionar Usuarios</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate("Notas")}
      >
        <Text style={styles.buttonText}>Ver Todas las Notas</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#28044d",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#575757",
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#6d28d9",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
