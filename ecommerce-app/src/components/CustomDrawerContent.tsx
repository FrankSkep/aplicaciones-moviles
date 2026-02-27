import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

function getActiveLeafRoute(state: any): string {
  if (!state?.routes) return "";
  const route = state.routes[state.index ?? 0];
  if (route.state) return getActiveLeafRoute(route.state);
  return route.name as string;
}

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { totalItems, totalPrice, favorites } = useCart();
  const activeRoute = useNavigationState((state) => getActiveLeafRoute(state));

  const handleLogout = () => {
    props.navigation.navigate("Inicio", {
      screen: "Login",
    } as any);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>FC</Text>
        </View>
        <Text style={styles.name}>Francisco Cornejo</Text>
        <Text style={styles.email}>francisco@ejemplo.com</Text>
        <View style={styles.badgesRow}>
          <View style={styles.badge}>
            <Ionicons name="cart-outline" size={12} color="#fff" />
            <Text style={styles.badgeText}> {totalItems} items</Text>
          </View>
          <View style={styles.badge}>
            <AntDesign name="heart" size={12} color="#fff" />
            <Text style={styles.badgeText}> {favorites.length} favs</Text>
          </View>
        </View>
      </View>

      {/* Navigation items */}
      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>

      {/* Quick actions */}
      <View style={styles.quickActions}>
        <Text style={styles.actionsTitle}>Acciones rápidas</Text>
        <DrawerItem
          label="Inicio"
          focused={activeRoute === "Home"}
          activeTintColor="#0f766e"
          inactiveTintColor="#64748b"
          activeBackgroundColor="#f0fdf4"
          icon={({ color, size }) => <AntDesign name="home" size={size} color={color} />}
          onPress={() =>
            props.navigation.navigate("Inicio", {
              screen: "HomeTabs",
              params: { screen: "Home" },
            } as any)
          }
          labelStyle={styles.drawerItemLabel}
        />
        <DrawerItem
          label="Carrito"
          focused={activeRoute === "Cart"}
          activeTintColor="#0f766e"
          inactiveTintColor="#64748b"
          activeBackgroundColor="#f0fdf4"
          icon={({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />}
          onPress={() =>
            props.navigation.navigate("Inicio", { screen: "Cart" } as any)
          }
          labelStyle={styles.drawerItemLabel}
        />
        <DrawerItem
          label="Mi perfil"
          focused={activeRoute === "Profile"}
          activeTintColor="#0f766e"
          inactiveTintColor="#64748b"
          activeBackgroundColor="#f0fdf4"
          icon={({ color, size }) => <AntDesign name="user" size={size} color={color} />}
          onPress={() =>
            props.navigation.navigate("Inicio", {
              screen: "HomeTabs",
              params: { screen: "Profile" },
            } as any)
          }
          labelStyle={styles.drawerItemLabel}
        />
      </View>

      {/* Cart summary */}
      {totalItems > 0 && (
        <View style={styles.cartSummary}>
          <Text style={styles.cartSummaryTitle}>Resumen del carrito</Text>
          <Text style={styles.cartSummaryText}>
            {totalItems} producto{totalItems !== 1 ? "s" : ""} · ${totalPrice.toFixed(2)}
          </Text>
        </View>
      )}

      {/* Logout */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <AntDesign name="logout" size={16} color="#ef4444" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.version}>TechShop v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#0f766e",
    padding: 22,
    paddingTop: 28,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#204f4b",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.25)",
  },
  avatarText: { color: "#fff", fontSize: 22, fontWeight: "700" },
  name: { color: "#fff", fontSize: 17, fontWeight: "700" },
  email: { color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 2, marginBottom: 14 },
  badgesRow: { flexDirection: "row", gap: 8 },
  badge: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, flexDirection: "row", alignItems: "center", gap: 4 },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  menu: { marginTop: 8 },
  quickActions: { marginTop: 4, borderTopWidth: 1, borderTopColor: "#f1f5f9", paddingTop: 8 },
  actionsTitle: { fontWeight: "700", color: "#94a3b8", paddingHorizontal: 16, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  drawerItemLabel: { fontSize: 14, color: "#334155" },
  cartSummary: { marginHorizontal: 16, backgroundColor: "#f0fdf4", borderRadius: 12, padding: 12, marginTop: 4 },
  cartSummaryTitle: { fontSize: 12, fontWeight: "700", color: "#16a34a", marginBottom: 2 },
  cartSummaryText: { fontSize: 13, color: "#166534" },
  footer: { marginTop: "auto", borderTopWidth: 1, borderTopColor: "#e2e8f0", paddingTop: 12, paddingBottom: 20 },
  logoutBtn: { marginHorizontal: 16, backgroundColor: "#fef2f2", borderRadius: 12, paddingVertical: 13, paddingHorizontal: 20 },
  logoutText: { color: "#ef4444", fontWeight: "700", fontSize: 15 },
  version: { textAlign: "center", color: "#94a3b8", fontSize: 11, marginTop: 12 },
});
