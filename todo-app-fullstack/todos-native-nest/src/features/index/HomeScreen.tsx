import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { TodosScreen } from "../todos/TodosScreen";
import { UsersScreen } from "../users/UsersScreen";
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
    onLogout?: () => void;
}

export default function HomeScreen({ onLogout }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<"todos" | "users">("todos");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TodoApp Fullstack</Text>
        {onLogout && (
          <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "todos" && styles.activeTab]} 
          onPress={() => setActiveTab("todos")}
        >
          <Text style={[styles.tabText, activeTab === "todos" && styles.activeTabText]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === "users" && styles.activeTab]} 
          onPress={() => setActiveTab("users")}
        >
          <Text style={[styles.tabText, activeTab === "users" && styles.activeTabText]}>Users</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === "todos" ? <TodosScreen /> : <UsersScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    borderBottomWidth: 1, 
    borderColor: "#eee" 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  logoutButton: { padding: 4 },
  tabs: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#ccc" },
  tab: { flex: 1, padding: 16, alignItems: "center" },
  activeTab: { borderBottomWidth: 3, borderColor: "#007AFF" },
  tabText: { fontSize: 16, color: "#666" },
  activeTabText: { color: "#007AFF", fontWeight: "bold" },
  content: { flex: 1 }
});
