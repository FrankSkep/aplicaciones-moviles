import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { PokemonDetails, pokemonService } from "../services/pokeapi.service";

interface PokemonCardProps {
  name: string;
  url: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, [name]);

  const loadDetails = async () => {
    try {
      setLoading(true);
      const data = await pokemonService.getPokemonDetails(name);
      setDetails(data);
    } catch (error) {
      console.error(`Error cargando detalles de ${name}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };
    return colors[type] || "#68A090";
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#3B4CCA" />
      </View>
    );
  }

  if (!details) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
        <Text style={styles.id}>#{details.id.toString().padStart(3, "0")}</Text>
      </View>

      <Image
        source={{
          uri: details.sprites.other["official-artwork"].front_default,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.typesContainer}>
        {details.types.map((typeInfo, index) => (
          <View
            key={index}
            style={[
              styles.typeBadge,
              { backgroundColor: getTypeColor(typeInfo.type.name) },
            ]}
          >
            <Text style={styles.typeText}>
              {typeInfo.type.name.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Altura</Text>
          <Text style={styles.statValue}>{details.height / 10} m</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Peso</Text>
          <Text style={styles.statValue}>{details.weight / 10} kg</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E3A59",
  },
  id: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8F9BB3",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#8F9BB3",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E3A59",
  },
});
