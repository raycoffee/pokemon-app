export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

export interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

export interface PokemonTypeFilterProps {
  availableTypes: string[];
  selectedTypes: string[];
  onTypeSelect: (types: string[]) => void;
}