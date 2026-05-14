export interface NamedApiResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedApiResource;
}

export interface PokemonAbilitySlot {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStatSlot {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeSlot[];
  abilities: PokemonAbilitySlot[];
  stats: PokemonStatSlot[];
  sprites: PokemonSprites;
}

export interface PokemonListItemView {
  id: number;
  name: string;
  types: string[];
}
