import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PokemonCard from '../components/PokemonCard';
import { fetchPokemonByType, fetchPokemonDetail, fetchPokemonList, fetchPokemonTypes } from '../services/pokeApi';
import { loadFavorites, toggleFavorite } from '../storage/favoritesStorage';
import type { PokemonListItemView } from '../types/pokemon';
import type { RootStackParamList } from '../types/navigation';
import { parsePokemonIdFromUrl } from '../utils/pokemon';

const LIST_LIMIT = 20;
const DEFAULT_TYPE = 'all';

type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unexpected error';
}

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const [baseItems, setBaseItems] = useState<PokemonListItemView[]>([]);
  const [items, setItems] = useState<PokemonListItemView[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState(DEFAULT_TYPE);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const [list, typeList, storedFavorites] = await Promise.all([
          fetchPokemonList(LIST_LIMIT, 0),
          fetchPokemonTypes(),
          loadFavorites(),
        ]);
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
          setBaseItems(details);
          setItems(details);
          setTypes(typeList.results.map((type) => type.name));
          setFavorites(storedFavorites);
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

  useEffect(() => {
    if (selectedType === DEFAULT_TYPE) {
      setItems(baseItems);
      return;
    }

    let isMounted = true;

    const loadByType = async () => {
      setLoading(true);
      setError(null);
      try {
        const typeDetail = await fetchPokemonByType(selectedType);
        const selected = typeDetail.pokemon.slice(0, LIST_LIMIT);
        const details = await Promise.all(
          selected.map(async (entry) => {
            const detail = await fetchPokemonDetail(entry.pokemon.name);
            return {
              id: detail.id,
              name: detail.name,
              types: detail.types.map((type) => type.type.name),
            };
          }),
        );
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

    loadByType();
    return () => {
      isMounted = false;
    };
  }, [baseItems, selectedType]);

  const visibleItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesName = normalizedQuery ? item.name.toLowerCase().includes(normalizedQuery) : true;
      const matchesFavorite = favoritesOnly ? favorites.includes(item.id) : true;
      return matchesName && matchesFavorite;
    });
  }, [favorites, favoritesOnly, items, searchQuery]);

  const handleToggleFavorite = async (id: number) => {
    const next = await toggleFavorite(id, favorites);
    setFavorites(next);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name"
          autoCapitalize="none"
          style={styles.searchInput}
        />
        <View style={styles.favoriteRow}>
          <Text style={styles.favoriteLabel}>Favorites only</Text>
          <Switch value={favoritesOnly} onValueChange={setFavoritesOnly} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.typeRow}>
          <Pressable
            onPress={() => setSelectedType(DEFAULT_TYPE)}
            style={[styles.typeChip, selectedType === DEFAULT_TYPE && styles.typeChipActive]}
          >
            <Text style={[styles.typeText, selectedType === DEFAULT_TYPE && styles.typeTextActive]}>All</Text>
          </Pressable>
          {types.map((type) => (
            <Pressable
              key={type}
              onPress={() => setSelectedType(type)}
              style={[styles.typeChip, selectedType === type && styles.typeChipActive]}
            >
              <Text style={[styles.typeText, selectedType === type && styles.typeTextActive]}>{type}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
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
          data={visibleItems}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.statusText}>No results</Text>}
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              types={item.types}
              onPress={() => navigation.navigate('Detail', { nameOrId: item.id.toString() })}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={() => handleToggleFavorite(item.id)}
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
  filters: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    backgroundColor: '#ffffff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1b1b1b',
  },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  favoriteLabel: {
    fontSize: 14,
    color: '#333333',
  },
  typeRow: {
    marginTop: 12,
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: '#f6f6f6',
  },
  typeChipActive: {
    backgroundColor: '#1b1b1b',
    borderColor: '#1b1b1b',
  },
  typeText: {
    fontSize: 12,
    color: '#1b1b1b',
    textTransform: 'capitalize',
  },
  typeTextActive: {
    color: '#ffffff',
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
