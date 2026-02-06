import React, { useState } from "react";
import {
    Animated,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BusinessCard() {
  const [visits, setVisits] = useState(0);
  const [avatarAnim] = useState(new Animated.Value(1));

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleAvatarPress = () => {
    setVisits((v) => v + 1);
    Animated.sequence([
      Animated.spring(avatarAnim, {
        toValue: 1.15,
        useNativeDriver: true,
      }),
      Animated.spring(avatarAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleAvatarPress}>
        <Animated.Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/125161818?s=400&u=5e999468f808e7f9e3b794546a7158431fa7c6e6&v=4",
          }}
          style={[styles.avatar, { transform: [{ scale: avatarAnim }] }]}
        />
      </TouchableOpacity>
      <Text style={styles.name}>Frank</Text>
      <Text style={styles.title}>Backend Developer</Text>
      <Text style={styles.description}>
        Aprendiendo React Native desde cero con Master Laurence
      </Text>
      <Text style={styles.visits}>👁️ Visitas: {visits}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.email]}
          onPress={() => openLink("mailto:francisco.cornejo77@uabc.edu.mx")}
        >
          <Text style={styles.buttonText}>📧 Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.phone]}
          onPress={() => openLink("tel:+6462142309")}
        >
          <Text style={styles.buttonText}>📱 Llamar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.linkedin]}
          onPress={() => openLink("https://linkedin.com/in/frankskep")}
        >
          <Text style={styles.buttonText}>💼 LinkedIn</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.github]}
          onPress={() => openLink("https://github.com/frankskep")}
        >
          <Text style={styles.buttonText}>🐙 GitHub</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.portfolio]}
          onPress={() => openLink("https://frankskep.com")}
        >
          <Text style={styles.buttonText}>🌐 Portfolio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232946",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    shadowColor: "#232946",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    margin: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: "#eebbc3",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#eebbc3",
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    color: "#b8c1ec",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#b8c1ec",
    textAlign: "center",
    marginBottom: 10,
  },
  visits: {
    fontSize: 13,
    color: "#eebbc3",
    marginBottom: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    marginBottom: 2,
  },
  buttonText: {
    color: "#232946",
    fontSize: 14,
    fontWeight: "bold",
  },
  email: {
    backgroundColor: "#eebbc3",
  },
  phone: {
    backgroundColor: "#b8c1ec",
  },
  linkedin: {
    backgroundColor: "#d1d1e9",
  },
  github: {
    backgroundColor: "#121629",
  },
  twitter: {
    backgroundColor: "#3b9ae1",
  },
  portfolio: {
    backgroundColor: "#f6c177",
  },
});
