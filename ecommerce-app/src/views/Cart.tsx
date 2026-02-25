import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../App";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<MainStackParamList, "Cart">;

export default function Cart({ navigation }: Props) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AntDesign name="shoppingcart" size={80} color="#94a3b8" style={{ marginBottom: 16 }} />
        <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
        <Text style={styles.emptySubtitle}>Añade productos para comenzar</Text>
        <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.shopBtnText}>Explorar productos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.product.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemEmoji}>{item.product.image}</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>${item.product.price.toFixed(2)} c/u</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.product.id, item.quantity - 1)}>
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.product.id, item.quantity + 1)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.itemTotal}>${(item.product.price * item.quantity).toFixed(2)}</Text>
              <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
                <AntDesign name="delete" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Productos ({totalItems})</Text>
          <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Envío</Text>
          <Text style={[styles.summaryValue, { color: "#16a34a" }]}>GRATIS</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate("Checkout")}>
          <Text style={styles.checkoutBtnText}>Proceder al pago →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40, backgroundColor: "#f1f5f9" },
  emptyTitle: { fontSize: 22, fontWeight: "700", color: "#1e293b", marginBottom: 8 },
  emptySubtitle: { fontSize: 15, color: "#94a3b8", marginBottom: 28 },
  shopBtn: { backgroundColor: "#0f766e", paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14 },
  shopBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  list: { padding: 16, gap: 12, paddingBottom: 4 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", gap: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 1 }, elevation: 1 },
  itemEmoji: { fontSize: 44 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: "600", color: "#1e293b", marginBottom: 4, lineHeight: 20 },
  itemPrice: { fontSize: 12, color: "#64748b", marginBottom: 8 },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  qtyBtn: { width: 28, height: 28, backgroundColor: "#f1f5f9", borderRadius: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#e2e8f0" },
  qtyBtnText: { fontSize: 16, fontWeight: "700", color: "#0f766e" },
  qty: { fontSize: 15, fontWeight: "700", color: "#1e293b", minWidth: 24, textAlign: "center" },
  itemRight: { alignItems: "flex-end", gap: 8 },
  itemTotal: { fontSize: 16, fontWeight: "700", color: "#0f766e" },
  summary: { backgroundColor: "#fff", padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: -4 }, elevation: 4 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  summaryLabel: { fontSize: 14, color: "#64748b" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#1e293b" },
  totalRow: { borderTopWidth: 1, borderTopColor: "#e2e8f0", marginTop: 8, paddingTop: 14 },
  totalLabel: { fontSize: 17, fontWeight: "700", color: "#1e293b" },
  totalValue: { fontSize: 20, fontWeight: "800", color: "#0f766e" },
  checkoutBtn: { backgroundColor: "#0f766e", borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 14 },
  checkoutBtnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
