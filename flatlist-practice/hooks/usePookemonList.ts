import { useCallback, useState } from "react";
import { Pokemon, pokemonService } from "../services/pokeapi.service";

export const usePokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LIMIT = 10; // Número de pokémon por página

  /**
   * Cargar la primera página de pokémon
   */
  const loadPokemons = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const response = await pokemonService.getPokemonList(0, LIMIT);

      setPokemons(response.results);
      setOffset(LIMIT);
      setHasMore(response.next !== null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al cargar pokémon:", err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  /**
   * Cargar más pokémon (para infinity scroll)
   */
  const loadMorePokemons = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const response = await pokemonService.getPokemonList(offset, LIMIT);

      setPokemons((prev) => [...prev, ...response.results]);
      setOffset((prev) => prev + LIMIT);
      setHasMore(response.next !== null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al cargar más pokémon:", err);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  /**
   * Refrescar la lista (pull to refresh)
   */
  const refreshPokemons = useCallback(async () => {
    if (refreshing) return;

    try {
      setRefreshing(true);
      setError(null);

      const response = await pokemonService.getPokemonList(0, LIMIT);

      setPokemons(response.results);
      setOffset(LIMIT);
      setHasMore(response.next !== null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error al refrescar pokémon:", err);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  return {
    pokemons,
    loading,
    refreshing,
    hasMore,
    error,
    loadPokemons,
    loadMorePokemons,
    refreshPokemons,
  };
};
