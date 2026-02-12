import { PokemonCard } from "@/components/PokemonCard";
import { usePokemonList } from "@/hooks/usePookemonList";
import { Pokemon } from "@/services/pokeapi.service";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonListScreen() {
  const {
    pokemons,
    loading,
    refreshing,
    hasMore,
    error,
    loadPokemons,
    loadMorePokemons,
    refreshPokemons,
  } = usePokemonList();

  useEffect(() => {
    loadPokemons();
  }, []);

  const renderItem = ({ item }: { item: Pokemon }) => (
    <PokemonCard name={item.name} url={item.url} />
  );

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#3B4CCA" />
        <Text style={styles.loadingText}>Cargando mas pokemones...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#3B4CCA" />
          <Text style={styles.loadingText}>Cargando pokemones...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.retryText}>
            Desliza hacia abajo para reintentar
          </Text>
        </View>
      );
    }

    return null;
  };

  const keyExtractor = (item: Pokemon, index: number) =>
    `${item.name}-${index}`;

  const handleEndReached = () => {
    if (!loading && hasMore) {
      loadMorePokemons();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>
          {pokemons.length > 0 ? `${pokemons.length} Pokémon` : "Cargando..."}
        </Text>
      </View>

      <FlatList
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        // Infinity Scroll
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        // Pull to Refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshPokemons}
            colors={["#3B4CCA"]}
            tintColor="#3B4CCA"
            title="Desliza para actualizar"
            titleColor="#8F9BB3"
          />
        }
        // Componentes adicionales
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        // Optimizaciones de performance
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E9F2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E3A59",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#8F9BB3",
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#8F9BB3",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3D71",
    marginBottom: 8,
    textAlign: "center",
  },
  retryText: {
    fontSize: 14,
    color: "#8F9BB3",
    textAlign: "center",
  },
});
