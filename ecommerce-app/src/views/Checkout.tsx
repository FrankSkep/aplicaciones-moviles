import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../App";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<MainStackParamList, "Checkout">;

export default function Checkout({ navigation }: Props) {
  const { items, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrder = () => {
    if (!name || !email || !address || !card) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart();
      Alert.alert(
        "¡Pedido confirmado!",
        `Gracias ${name}! Tu pedido por $${totalPrice.toFixed(2)} ha sido confirmado.\nRecibirás un email en ${email}.`,
        [
          {
            text: "Volver al inicio",
            onPress: () => navigation.navigate("HomeTabs", { screen: "Home" }),
          },
        ]
      );
    }, 1800);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <AntDesign name="inbox" size={16} color="#1e293b" />
          <Text style={styles.sectionTitle}>Resumen del pedido</Text>
        </View>
        {items.map((item) => (
          <View key={item.product.id} style={styles.orderItem}>
            <Text style={styles.orderEmoji}>{item.product.image}</Text>
            <Text style={styles.orderName} numberOfLines={1}>{item.product.name}</Text>
            <Text style={styles.orderQty}>×{item.quantity}</Text>
            <Text style={styles.orderPrice}>${(item.product.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total a pagar</Text>
          <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <AntDesign name="user" size={16} color="#1e293b" />
          <Text style={styles.sectionTitle}>Datos personales</Text>
        </View>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput style={styles.input} placeholder="Juan García" value={name} onChangeText={setName} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="juan@email.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Text style={styles.label}>Dirección de envío</Text>
        <TextInput style={[styles.input, styles.multiInput]} placeholder="Calle Falsa 123, Ciudad..." value={address} onChangeText={setAddress} multiline />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <AntDesign name="creditcard" size={16} color="#1e293b" />
          <Text style={styles.sectionTitle}>Pago</Text>
        </View>
        <Text style={styles.label}>Número de tarjeta</Text>
        <TextInput style={styles.input} placeholder="•••• •••• •••• ••••" value={card} onChangeText={setCard} keyboardType="numeric" maxLength={19} />
        <View style={styles.cardRow}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Vencimiento</Text>
            <TextInput style={styles.input} placeholder="MM/AA" keyboardType="numeric" maxLength={5} />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>CVV</Text>
            <TextInput style={styles.input} placeholder="•••" keyboardType="numeric" maxLength={3} secureTextEntry />
          </View>
        </View>
        <View style={styles.secureNote}>
          <AntDesign name="lock" size={14} color="#16a34a" />
          <Text style={styles.secureText}>Pago seguro SSL · Datos demo (no reales)</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.payBtn, loading && styles.payBtnLoading]} onPress={handleOrder} disabled={loading}>
        <Text style={styles.payBtnText}>{loading ? "Procesando..." : `Pagar $${totalPrice.toFixed(2)}`}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  content: { padding: 16, paddingBottom: 40, gap: 16 },
  section: { backgroundColor: "#fff", borderRadius: 16, padding: 18, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1e293b" },
  orderItem: { flexDirection: "row", alignItems: "center", paddingVertical: 6, gap: 8 },
  orderEmoji: { fontSize: 24 },
  orderName: { flex: 1, fontSize: 13, color: "#475569" },
  orderQty: { fontSize: 13, color: "#94a3b8" },
  orderPrice: { fontSize: 13, fontWeight: "700", color: "#1e293b" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 12, marginTop: 8 },
  totalLabel: { fontSize: 15, fontWeight: "700", color: "#1e293b" },
  totalValue: { fontSize: 18, fontWeight: "800", color: "#0f766e" },
  label: { fontSize: 13, fontWeight: "600", color: "#64748b", marginBottom: 6, marginTop: 8 },
  input: { backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11, fontSize: 15, color: "#1e293b" },
  multiInput: { height: 72, textAlignVertical: "top" },
  cardRow: { flexDirection: "row", gap: 12 },
  halfField: { flex: 1 },
  secureNote: { backgroundColor: "#f0fdf4", borderRadius: 8, padding: 10, marginTop: 12, flexDirection: "row", alignItems: "center", gap: 6 },
  secureText: { fontSize: 12, color: "#16a34a" },
  payBtn: { backgroundColor: "#0f766e", borderRadius: 16, paddingVertical: 18, alignItems: "center", marginTop: 4 },
  payBtnLoading: { backgroundColor: "#94a3b8" },
  payBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
