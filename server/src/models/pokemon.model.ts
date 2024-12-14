import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  types: [{ type: String, required: true }],
  sprite: { type: String, required: true },
  spriteBase64: { type: String },
  stats: {
    hp: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    speed: { type: Number, required: true }
  },
  lastUpdated: { type: Date, default: Date.now }
});

export const PokemonModel = mongoose.model('Pokemon', pokemonSchema);