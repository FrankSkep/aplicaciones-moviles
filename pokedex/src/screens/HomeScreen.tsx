import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemonDetail, fetchPokemonList } from '../services/pokeApi';
import type { PokemonListItemView } from '../types/pokemon';
import type { RootStackParamList } from '../types/navigation';
import { parsePokemonIdFromUrl } from '../utils/pokemon';

const LIST_LIMIT = 20;

type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unexpected error';
}

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const [items, setItems] = useState<PokemonListItemView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await fetchPokemonList(LIST_LIMIT, 0);
        const detailPromises = list.results.map(async (item) => {
          const id = parsePokemonIdFromUrl(item.url);
          const detail = await fetchPokemonDetail(Number.isNaN(id) ? item.name : id);
          return {
            id: detail.id,
            name: detail.name,
            types: detail.types.map((type) => type.type.name),
          };
        });
        const details = await Promise.all(detailPromises);
        if (isMounted) {
          setItems(details);
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

    loadPokemon();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.statusText}>Loading Pokemon...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.statusText}>No results</Text>}
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              types={item.types}
              onPress={() => navigation.navigate('Detail', { nameOrId: item.id.toString() })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
