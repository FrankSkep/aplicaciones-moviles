/**
 * Profile — ZUSTAND
 * Gestiona usuario y contador con Zustand.
 */

import { StyleSheet, Text, View } from "react-native";
import { useUserStore } from "../state/zustand/useUserStore";
import { useCounterStore } from "../state/zustand/useCounterStore";

const PRIMARY = "#0f766e";
const BG = "#ffffff";
const TEXT = "#1e293b";
const CARD = "#f1f5f9";
const BORDER = "#e2e8f0";

export default function Profile() {
  const { user } = useUserStore();
  const { count } = useCounterStore();

  const colors = { background: BG, text: TEXT, primary: PRIMARY, card: CARD, border: BORDER };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={styles.avatarText}>
          {user.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.text }]}>Nombre</Text>
        <Text style={[styles.value, { color: colors.primary }]}>{user.name}</Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <Text style={[styles.value, { color: colors.primary }]}>{user.email}</Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.label, { color: colors.text }]}>
          Contador (gestionado con Zustand)
        </Text>
        <Text style={[styles.value, { color: colors.primary }]}>{count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 4,
  },
  label: {
    fontSize: 12,
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
});
