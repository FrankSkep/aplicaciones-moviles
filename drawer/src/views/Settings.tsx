/**
 * Settings — CONTEXT API
 * Gestiona el tema claro/oscuro con Context API.
 */

import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../state/context/ThemeContext";

export default function Settings() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Apariencia
      </Text>

      <View
        style={[
          styles.row,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View>
          <Text style={[styles.rowTitle, { color: colors.text }]}>
            {theme === "dark" ? "Modo Oscuro 🌙" : "Modo Claro ☀️"}
          </Text>
          <Text style={[styles.rowSubtitle, { color: colors.text }]}>
            Cambia el tema en toda la app
          </Text>
        </View>

        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: "#94a3b8", true: colors.primary }}
          thumbColor="#ffffff"
        />
      </View>

      <View
        style={[
          styles.infoBox,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.infoTitle, { color: colors.primary }]}>
          Estado global activo
        </Text>
        <Text style={[styles.infoText, { color: colors.text }]}>
          • Settings → Context API (tema){"\n"}
          • Home → Redux Toolkit (contador){"\n"}
          • Profile → Zustand (usuario)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.5,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  rowSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
});
