import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function CondBadge({
  ok,
  label,
  info,
}: {
  ok: boolean;
  label: string;
  info: string;
}) {
  return (
    <View style={[styles.badge, ok ? styles.badgeOk : styles.badgeNo]}>
      <Text style={styles.badgeLabel}>
        {ok ? "✓" : "✗"} {label}
      </Text>
      <Text style={styles.badgeInfo}>{info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  badgeOk: { backgroundColor: "#16a34a" },
  badgeNo: { backgroundColor: "#dc2626" },
  badgeLabel: { color: "#fff", fontWeight: "600", fontSize: 12 },
  badgeInfo: {
    color: "#e2e8f0",
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
  },
});
