const BASE_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export const pokemonService = {
  /**
   * Obtener lista de pokemon con paginacion
   * offset - elementos a saltar
   * limit - tamaño de la pagina (por defecto 10)
   */
  async getPokemonList(
    offset: number = 0,
    limit: number = 20,
  ): Promise<PokemonListResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error("Error al obtener la lista de pokémon");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getPokemonList:", error);
      throw error;
    }
  },

  /**
   * Obtener detalles de un pokémon específico
   */
  async getPokemonDetails(nameOrId: string | number): Promise<PokemonDetails> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

      if (!response.ok) {
        throw new Error(`Error al obtener detalles de ${nameOrId}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getPokemonDetails:", error);
      throw error;
    }
  },

  /**
   * Extraer el ID del pokémon desde su URL
   */
  getPokemonIdFromUrl(url: string): number {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 2]);
  },
};
