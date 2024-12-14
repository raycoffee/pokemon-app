'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonState {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
}

type PokemonAction =
  | { type: 'SET_POKEMON'; payload: Pokemon[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const PokemonContext = createContext<{
  state: PokemonState;
  dispatch: React.Dispatch<PokemonAction>;
} | null>(null);

const initialState: PokemonState = {
  pokemon: [],
  loading: false,
  error: null,
};

function pokemonReducer(state: PokemonState, action: PokemonAction): PokemonState {
  switch (action.type) {
    case 'SET_POKEMON':
      return { ...state, pokemon: action.payload, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
}