import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { capitalize, formatPokemonId, getPokemonImageUrl } from '../utils/pokemon';

type PokemonCardProps = {
  id: number;
  name: string;
  types: string[];
  onPress: () => void;
};

export default function PokemonCard({ id, name, types, onPress }: PokemonCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: getPokemonImageUrl(id) }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{capitalize(name)}</Text>
        <Text style={styles.id}>{formatPokemonId(id)}</Text>
        <View style={styles.typeRow}>
          {(types.length ? types : ['unknown']).map((type) => (
            <View key={type} style={styles.typeChip}>
              <Text style={styles.typeText}>{capitalize(type)}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f6f6f6',
    marginBottom: 12,
  },
  image: {
    width: 72,
    height: 72,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1b1b1b',
  },
  id: {
    fontSize: 12,
    color: '#6b6b6b',
    marginTop: 2,
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  typeChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#e5e5e5',
  },
  typeText: {
    fontSize: 12,
    color: '#2b2b2b',
  },
});
