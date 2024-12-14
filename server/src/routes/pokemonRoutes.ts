import express from 'express';
import { PokemonService } from '../services/pokemonService';

const router = express.Router();
const pokemonService = new PokemonService();

router.get('/pokemon', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 151;
    const pokemon = await pokemonService.getPokemonList(limit);
    res.json(pokemon);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon' });
  }
});

export default router;