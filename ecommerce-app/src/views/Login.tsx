import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../App";

type Props = NativeStackScreenProps<MainStackParamList, "Login">;

export default function Login({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Demo: any credentials work
    navigation.navigate("HomeTabs", { screen: "Home" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Ionicons name="cart-outline" size={64} color="#fff" style={styles.logoIcon} />
        <Text style={styles.logoTitle}>TechShop</Text>
        <Text style={styles.logoSubtitle}>Tu tienda de tecnología favorita</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.welcome}>Iniciar sesión</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="usuario@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.demo}>Demo: cualquier credencial funciona</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f766e", justifyContent: "center", padding: 24 },
  logoArea: { alignItems: "center", marginBottom: 36 },
  logoIcon: { marginBottom: 8 },
  logoTitle: { fontSize: 32, fontWeight: "800", color: "#fff", letterSpacing: 1 },
  logoSubtitle: { fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 4 },
  card: { backgroundColor: "#fff", borderRadius: 24, padding: 28 },
  welcome: { fontSize: 22, fontWeight: "700", color: "#1e293b", marginBottom: 20 },
  label: { fontSize: 13, fontWeight: "600", color: "#64748b", marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 13, fontSize: 15, color: "#1e293b" },
  loginBtn: { backgroundColor: "#0f766e", borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 24 },
  loginBtnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  demo: { textAlign: "center", color: "#94a3b8", fontSize: 12, marginTop: 14 },
});
