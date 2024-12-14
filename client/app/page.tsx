'use client';

import { useEffect } from 'react';
import { ErrorBoundary } from '../src/components/ErrorBoundary/ErrorBoundary';
import PokedexGrid from '../src/components/PokedexGrid/PokedexGrid';
import LoadingSkeleton from '../src/components/LoadingSkeleton/LoadingSkeleton';
import { usePokemon } from '../src/context/PokemonContext';

export default function Home() {
  const { state, dispatch } = usePokemon();

  useEffect(() => {
    async function fetchPokemon() {
      if (state.pokemon.length === 0) {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          const endpoint = process.env.NEXT_PUBLIC_POKEMON_API_ENDPOINT;
          const url = `${baseUrl}${endpoint}`;
          
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch Pokemon');
          }
          const data = await response.json();
          dispatch({ type: 'SET_POKEMON', payload: data });
        } catch (error) {
          console.error('Error fetching Pokemon:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to load Pokemon data' });
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    }

    fetchPokemon();
  }, [dispatch, state.pokemon.length]);

  return (
    <ErrorBoundary>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Pokédex</h1>
        {state.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {state.error}
          </div>
        )}
        {state.loading ? (
          <LoadingSkeleton />
        ) : (
          <PokedexGrid pokemonList={state.pokemon} />
        )}
      </main>
    </ErrorBoundary>
  );
}