/**
 * Home — REDUX TOOLKIT
 * Gestiona el contador con Redux Toolkit.
 */

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../state/redux/hooks";
import {
  increment,
  decrement,
  reset,
} from "../state/redux/slices/counterSlice";

const PRIMARY = "#0f766e";
const BG = "#ffffff";
const TEXT = "#1e293b";

export default function Home() {
  const count = useAppSelector((s) => s.counter.count);
  const dispatch = useAppDispatch();

  const colors = { background: BG, text: TEXT, primary: PRIMARY };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Contador Global
      </Text>

      <Text style={[styles.count, { color: colors.primary }]}>{count}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonOutline, { borderColor: colors.primary }]}
          onPress={() => dispatch(reset())}
        >
          <Text style={[styles.buttonOutlineText, { color: colors.primary }]}>
            Reset
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.hint, { color: colors.text }]}>
        Estado manejado con Redux Toolkit
      </Text>
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
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
  },
  count: {
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 32,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 32,
  },
  buttonOutline: {
    width: 72,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutlineText: {
    fontSize: 14,
    fontWeight: "600",
  },
  hint: {
    marginTop: 32,
    fontSize: 13,
    opacity: 0.6,
    textAlign: "center",
  },
});
