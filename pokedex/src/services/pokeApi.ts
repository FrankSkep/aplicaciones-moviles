import type { PokemonDetail, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  return fetchJson<PokemonListResponse>(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
}

export async function fetchPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
  return fetchJson<PokemonDetail>(`${BASE_URL}/pokemon/${nameOrId}`);
}
