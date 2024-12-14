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
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.raypivot.site';
          const endpoint = process.env.NEXT_PUBLIC_POKEMON_API_ENDPOINT || '/api/pokemon';
          const url = `${baseUrl}${endpoint}`;
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://pokedex-eta-lake-67.vercel.app'
            },
            credentials: 'include', 
            mode: 'cors',
            cache: 'no-cache' 
          });

          if (!response.ok) {
            const errorData = await response.text();
            console.error('Response error:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          dispatch({ type: 'SET_POKEMON', payload: data });
        } catch (error: unknown) {
          console.error('Error fetching Pokemon:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          dispatch({ type: 'SET_ERROR', payload: `Failed to load Pokemon data: ${errorMessage}` });
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