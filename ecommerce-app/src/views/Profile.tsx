import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

const ORDER_HISTORY = [
  { id: "ORD-001", date: "15 Ene 2025", total: 209.97, status: "Entregado", items: 3 },
  { id: "ORD-002", date: "28 Ene 2025", total: 79.99, status: "En camino", items: 1 },
  { id: "ORD-003", date: "05 Feb 2025", total: 45.99, status: "Procesando", items: 2 },
];

const STATUS_COLORS: Record<string, string> = {
  Entregado: "#16a34a",
  "En camino": "#0f766e",
  Procesando: "#d97706",
};

export default function Profile() {
  const { favorites } = useCart();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarLg}>
          <Text style={styles.avatarText}>FC</Text>
        </View>
        <Text style={styles.name}>Francisco Cornejo</Text>
        <Text style={styles.email}>francisco@ejemplo.com</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{ORDER_HISTORY.length}</Text>
            <Text style={styles.statLabel}>Pedidos</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favoritos</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <AntDesign name="star" size={24} color="#f59e0b" />
            <Text style={styles.statLabel}>Premium</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historial de pedidos</Text>
        {ORDER_HISTORY.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[order.status] + "20" }]}>
                <Text style={[styles.statusText, { color: STATUS_COLORS[order.status] }]}>{order.status}</Text>
              </View>
            </View>
            <Text style={styles.orderMeta}>{order.date} · {order.items} productos</Text>
            <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración de cuenta</Text>
        {([
          { label: "Datos personales", icon: "person-outline" },
          { label: "Métodos de pago",  icon: "card-outline" },
          { label: "Direcciones",       icon: "location-outline" },
          { label: "Notificaciones",    icon: "notifications-outline" },
          { label: "Privacidad",        icon: "lock-closed-outline" },
        ] as { label: string; icon: keyof typeof Ionicons.glyphMap }[]).map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconBox}>
                <Ionicons name={item.icon} size={18} color="#0f766e" />
              </View>
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  header: { backgroundColor: "#0f766e", paddingTop: 28, paddingBottom: 28, alignItems: "center", paddingHorizontal: 20 },
  avatarLg: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#204f4b", alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 3, borderColor: "rgba(255,255,255,0.3)" },
  avatarText: { color: "#fff", fontSize: 28, fontWeight: "700" },
  name: { color: "#fff", fontSize: 20, fontWeight: "700", marginBottom: 2 },
  email: { color: "rgba(255,255,255,0.75)", fontSize: 14, marginBottom: 20 },
  statsRow: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 16, paddingVertical: 14, paddingHorizontal: 24, gap: 24, alignItems: "center" },
  stat: { alignItems: "center" },
  statNum: { fontSize: 20, fontWeight: "700", color: "#fff" },
  statLabel: { fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 },
  divider: { width: 1, height: 36, backgroundColor: "rgba(255,255,255,0.25)" },
  section: { backgroundColor: "#fff", margin: 16, marginBottom: 0, borderRadius: 16, padding: 18, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1e293b", marginBottom: 14 },
  orderCard: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  orderHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  orderId: { fontSize: 14, fontWeight: "700", color: "#1e293b" },
  statusBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  statusText: { fontSize: 12, fontWeight: "600" },
  orderMeta: { fontSize: 12, color: "#94a3b8", marginBottom: 2 },
  orderTotal: { fontSize: 15, fontWeight: "700", color: "#0f766e" },
  menuItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  menuItemLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuIconBox: { width: 34, height: 34, borderRadius: 10, backgroundColor: "#f0fdf4", alignItems: "center", justifyContent: "center" },
  menuItemText: { fontSize: 15, color: "#334155" },
  menuArrow: { fontSize: 20, color: "#94a3b8" },
});
