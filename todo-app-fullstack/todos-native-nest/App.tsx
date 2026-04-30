import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { queryClient } from "./src/lib/queryClient";
import HomeScreen from "./src/features/index/HomeScreen";
import { LoginScreen } from "./src/features/auth/LoginScreen";
import { RegisterScreen } from "./src/features/auth/RegisterScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { getAccessToken, removeTokens } from "./src/lib/secureStore";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await getAccessToken();
      setIsAuthenticated(!!token);
    };
    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <HomeScreen onLogout={async () => {
          await removeTokens();
          setIsAuthenticated(false);
          queryClient.clear();
        }} />
      ) : showRegister ? (
        <RegisterScreen 
          onRegisterSuccess={() => setShowRegister(false)} 
          onGoToLogin={() => setShowRegister(false)} 
        />
      ) : (
        <LoginScreen 
          onLoginSuccess={() => setIsAuthenticated(true)} 
          onGoToRegister={() => setShowRegister(true)}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
