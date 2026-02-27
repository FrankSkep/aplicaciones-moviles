import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        {([
          { label: "Notificaciones push", subtitle: "Ofertas y estado de pedidos",  icon: "notifications-outline",  value: notifications, setter: setNotifications },
          { label: "Modo oscuro",          subtitle: "Cambiar apariencia de la app", icon: "moon-outline",            value: darkMode,       setter: setDarkMode },
          { label: "Acceso biométrico",    subtitle: "Huella o Face ID",            icon: "finger-print",          value: biometrics,     setter: setBiometrics },
          { label: "Newsletter",           subtitle: "Novedades y promociones",     icon: "mail-outline",          value: newsletter,     setter: setNewsletter },
        ] as { label: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap; value: boolean; setter: (v: boolean) => void }[]).map((item) => (
          <View key={item.label} style={styles.settingRow}>
            <View style={styles.settingIconBox}>
              <Ionicons name={item.icon} size={18} color="#0f766e" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.setter}
              trackColor={{ false: "#e2e8f0", true: "#0f766e" }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deep Linking</Text>
        <View style={styles.deepLinkCard}>
          <Text style={styles.deepLinkTitle}>URLs soportadas:</Text>
          {[
            "myapp://home",
            "myapp://product/1",
            "myapp://product/3",
            "myapp://cart",
            "myapp://profile",
            "myapp://settings",
          ].map((url) => (
            <View key={url} style={styles.urlRow}>
              <Text style={styles.urlText}>{url}</Text>
            </View>
          ))}
          <Text style={styles.deepLinkNote}>
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información</Text>
        {([
          { k: "Versión",     v: "1.0.0",                     icon: "information-circle-outline" },
          { k: "Plataforma", v: "Expo / React Native",         icon: "phone-portrait-outline" },
          { k: "Navegación", v: "Stack + Tabs + Drawer",      icon: "navigate-outline" },
        ] as { k: string; v: string; icon: keyof typeof Ionicons.glyphMap }[]).map(({ k, v, icon }) => (
          <View key={k} style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name={icon} size={16} color="#64748b" style={{ marginRight: 8 }} />
              <Text style={styles.infoKey}>{k}</Text>
            </View>
            <Text style={styles.infoVal}>{v}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.clearCacheBtn}>
        <Text style={styles.clearCacheText}>Limpiar caché</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9" },
  section: { backgroundColor: "#fff", margin: 16, marginBottom: 0, borderRadius: 16, padding: 18, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1e293b", marginBottom: 14 },
  settingRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f8fafc", gap: 12 },
  settingIconBox: { width: 34, height: 34, borderRadius: 10, backgroundColor: "#f0fdf4", alignItems: "center", justifyContent: "center" },
  settingInfo: { flex: 1, marginRight: 4 },
  settingLabel: { fontSize: 15, fontWeight: "500", color: "#1e293b" },
  settingSubtitle: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  deepLinkCard: { backgroundColor: "#f8fafc", borderRadius: 12, padding: 14, gap: 6 },
  deepLinkTitle: { fontSize: 13, fontWeight: "700", color: "#475569", marginBottom: 4 },
  urlRow: { backgroundColor: "#f0fdf4", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  urlText: { fontSize: 13, color: "#0f766e", fontFamily: "monospace" },
  deepLinkNote: { fontSize: 12, color: "#64748b", lineHeight: 18, marginTop: 8 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f8fafc" },
  infoLeft: { flexDirection: "row", alignItems: "center" },
  infoKey: { fontSize: 14, color: "#64748b" },
  infoVal: { fontSize: 14, fontWeight: "600", color: "#1e293b" },
  clearCacheBtn: { margin: 16, backgroundColor: "#fff", borderRadius: 12, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "#e2e8f0" },
  clearCacheText: { color: "#ef4444", fontWeight: "600", fontSize: 15 },
});
