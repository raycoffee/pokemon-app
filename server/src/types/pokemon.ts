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