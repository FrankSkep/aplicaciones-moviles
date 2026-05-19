import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'favorites';

function sanitizeFavorites(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item) => typeof item === 'number' && Number.isFinite(item));
}

export async function loadFavorites(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return sanitizeFavorites(JSON.parse(raw));
  } catch {
    return [];
  }
}

export async function saveFavorites(favorites: number[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Ignore storage errors to keep the UI responsive.
  }
}

export function isFavorite(id: number, favorites: number[]): boolean {
  return favorites.includes(id);
}

export async function toggleFavorite(id: number, favorites: number[]): Promise<number[]> {
  const exists = favorites.includes(id);
  const next = exists ? favorites.filter((item) => item !== id) : [...favorites, id];
  await saveFavorites(next);
  return next;
}
