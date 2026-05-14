export function parsePokemonIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? Number(match[1]) : Number.NaN;
}

export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

export function capitalize(value: string): string {
  if (!value) {
    return value;
  }
  return value[0].toUpperCase() + value.slice(1);
}
