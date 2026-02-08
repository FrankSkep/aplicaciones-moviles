import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Mi Perfil
          </ThemedText>
        </ThemedView>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={120} color="#6366F1" />
          </View>
          <ThemedText style={styles.userName}>Frank S.</ThemedText>
          <ThemedText style={styles.userRole}>
            Desarrollador de Software
          </ThemedText>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <IconSymbol name="envelope.fill" size={20} color="#666" />
            <ThemedText style={styles.infoText}>
              frankskep@uabc.edu.mx
            </ThemedText>
          </View>

          <View style={styles.infoRow}>
            <IconSymbol name="phone.fill" size={20} color="#666" />
            <ThemedText style={styles.infoText}>+52 (646) 123-4567</ThemedText>
          </View>

          <View style={styles.infoRow}>
            <IconSymbol name="mappin.and.ellipse" size={20} color="#666" />
            <ThemedText style={styles.infoText}>
              Ensenada, BC, México
            </ThemedText>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <ThemedText style={styles.logoutText}>Cerrar Sesión</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontFamily: Fonts.rounded,
    fontSize: 28,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 40,
  },
  avatarContainer: {
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  userRole: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: "#f8f9fa",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  infoText: {
    fontSize: 16,
    color: "#444",
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 50,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#fee2e2",
    alignItems: "center",
  },
  logoutText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "bold",
  },
});
