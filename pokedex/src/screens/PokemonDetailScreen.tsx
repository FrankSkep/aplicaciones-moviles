import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { fetchPokemonDetail } from '../services/pokeApi';
import { loadFavorites, toggleFavorite } from '../storage/favoritesStorage';
import type { PokemonDetail } from '../types/pokemon';
import type { RootStackParamList } from '../types/navigation';
import { capitalize, formatPokemonId, getPokemonImageUrl } from '../utils/pokemon';

type DetailRoute = RouteProp<RootStackParamList, 'Detail'>;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unexpected error';
}

export default function PokemonDetailScreen() {
  const route = useRoute<DetailRoute>();
  const { nameOrId } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const detail = await fetchPokemonDetail(nameOrId);
        if (isMounted) {
          setPokemon(detail);
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDetail();
    return () => {
      isMounted = false;
    };
  }, [nameOrId]);

  useEffect(() => {
    let isMounted = true;
    const hydrateFavorites = async () => {
      const stored = await loadFavorites();
      if (isMounted) {
        setFavorites(stored);
      }
    };
    hydrateFavorites();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>Loading details...</Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error ?? 'Pokemon not found'}</Text>
      </View>
    );
  }

  const heightMeters = pokemon.height / 10;
  const weightKg = pokemon.weight / 10;
  const isFavorite = favorites.includes(pokemon.id);

  const handleToggleFavorite = async () => {
    const next = await toggleFavorite(pokemon.id, favorites);
    setFavorites(next);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: getPokemonImageUrl(pokemon.id) }} style={styles.image} />
      <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      <Text style={styles.id}>{formatPokemonId(pokemon.id)}</Text>
      <Pressable onPress={handleToggleFavorite} style={styles.favoriteButton}>
        <Text style={styles.favoriteText}>{isFavorite ? 'Remove favorite' : 'Add favorite'}</Text>
      </Pressable>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Types</Text>
        <View style={styles.rowWrap}>
          {pokemon.types.map((type) => (
            <View key={type.type.name} style={styles.typeChip}>
              <Text style={styles.typeText}>{capitalize(type.type.name)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Info</Text>
        <Text style={styles.infoText}>Height: {heightMeters.toFixed(1)} m</Text>
        <Text style={styles.infoText}>Weight: {weightKg.toFixed(1)} kg</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Abilities</Text>
        {pokemon.abilities.map((ability) => (
          <Text key={ability.ability.name} style={styles.infoText}>
            {capitalize(ability.ability.name)}{ability.is_hidden ? ' (Hidden)' : ''}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Base Stats</Text>
        {pokemon.stats.map((stat) => (
          <View key={stat.stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{capitalize(stat.stat.name)}</Text>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
    backgroundColor: '#ffffff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  id: {
    textAlign: 'center',
    color: '#6b6b6b',
    marginBottom: 16,
  },
  favoriteButton: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#1b1b1b',
    marginBottom: 16,
  },
  favoriteText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
  },
  typeText: {
    fontSize: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 6,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
  statName: {
    fontSize: 14,
    color: '#333333',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1b1b1b',
  },
  statusText: {
    marginTop: 12,
    color: '#4b4b4b',
  },
  errorText: {
    color: '#b00020',
    textAlign: 'center',
  },
});
