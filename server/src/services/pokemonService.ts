import axios from 'axios';
import { Pokemon } from '../types/pokemon';

export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  
  async getPokemonList(limit: number = 151): Promise<Pokemon[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/pokemon?limit=${limit}`);
      const results = response.data.results;
      
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon: any) => {
          const detailResponse = await axios.get(pokemon.url);
          const data = detailResponse.data;
          
          return {
            id: data.id,
            name: data.name,
            types: data.types.map((t: any) => t.type.name),
            sprite: data.sprites.front_default,
            stats: {
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              speed: data.stats[5].base_stat,
            },
          };
        })
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      throw error;
    }
  }
}