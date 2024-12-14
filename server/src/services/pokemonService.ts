import axios from 'axios';
import { Pokemon } from '../types/pokemon';
import { PokemonModel } from '../models/pokemon.model';

export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  private async downloadAndConvertToBase64(url: string): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/png;base64,${base64}`;
  }

  private transformToPokemon(doc: any): Pokemon {
    const { id, name, types, spriteBase64, sprite, stats } = doc;
    return {
      id,
      name,
      types,
      sprite: spriteBase64 || sprite,
      stats: {
        hp: stats.hp,
        attack: stats.attack,
        defense: stats.defense,
        speed: stats.speed
      }
    };
  }

  async getPokemonList(limit: number = 151): Promise<Pokemon[]> {
    try {
     
      const cachedPokemon = await PokemonModel.find()
        .sort({ id: 1 })
        .limit(limit);

      if (cachedPokemon.length === limit) {
        return cachedPokemon.map(pokemon => this.transformToPokemon(pokemon.toObject()));
      }

      const response = await axios.get(`${this.baseUrl}/pokemon?limit=${limit}`);
      const results = response.data.results;
      
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon: any) => {
          const cachedPokemon = await PokemonModel.findOne({ name: pokemon.name });
          if (cachedPokemon && cachedPokemon.spriteBase64) {
            return this.transformToPokemon(cachedPokemon.toObject());
          }

          const detailResponse = await axios.get(pokemon.url);
          const data = detailResponse.data;

          const spriteBase64 = await this.downloadAndConvertToBase64(data.sprites.front_default);
          
          const pokemonData = {
            id: data.id,
            name: data.name,
            types: data.types.map((t: any) => t.type.name),
            sprite: data.sprites.front_default,
            spriteBase64,
            stats: {
              hp: data.stats[0].base_stat,
              attack: data.stats[1].base_stat,
              defense: data.stats[2].base_stat,
              speed: data.stats[5].base_stat,
            }
          };

          await PokemonModel.findOneAndUpdate(
            { id: pokemonData.id },
            pokemonData,
            { upsert: true, new: true }
          );

          return this.transformToPokemon(pokemonData);
        })
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      throw error;
    }
  }
}