'use client';

import React, { useState } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import PokemonTypeFilter from '../PokemonTypeFilter/PokemonTypeFilter';

interface Pokemon {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

interface PokedexGridProps {
    pokemonList: Pokemon[];
    initialView?: 'grid' | 'list';
}

const PokedexGrid: React.FC<PokedexGridProps> = ({ pokemonList, initialView = 'grid' }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState<'name' | 'id' | 'type'>('id');
    const [view, setView] = useState<'grid' | 'list'>(initialView);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const itemsPerPage = 12;
    const allTypes = Array.from(new Set(pokemonList.flatMap((p) => p.types))).sort();

    const filteredPokemon = pokemonList.filter((pokemon) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = pokemon.name.toLowerCase().includes(query) ||
                            pokemon.types.some(type => type.toLowerCase().includes(query));
        const matchesType = selectedTypes.length === 0 ||
                          selectedTypes.every((type) => pokemon.types.includes(type));
        return matchesSearch && matchesType;
    });

    const sortedPokemon = [...filteredPokemon].sort((a, b) => {

        switch (sortOption) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'id':
                return a.id - b.id;
            case 'type':
                return a.types[0].localeCompare(b.types[0]);
            default:
                return 0;
        }
    });

    const paginatedPokemon = sortedPokemon.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold text-center mb-12 
                    bg-gradient-to-r from-blue-600 to-purple-600 
                    bg-clip-text text-transparent">
                    Pokédex
                </h1>
    
                <div className="bg-white/60 backdrop-blur-lg rounded-2xl 
                    shadow-xl p-6 mb-8 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Search Pokémon..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="search-input"
                        />
                        <div className="flex gap-4 items-center">
                            <select
                                value={sortOption}
                                onChange={(e) => {
                                    setSortOption(e.target.value as 'name' | 'id' | 'type');
                                    setCurrentPage(1);
                                }}
                                className="px-4 py-2 rounded-lg border border-gray-200 
                                    focus:ring-2 focus:ring-blue-400 outline-none"
                            >
                                <option value="id">Number</option>
                                <option value="name">Name</option>
                                <option value="type">Type</option>
                            </select>
                            <button
                                onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                                className="control-button bg-blue-500 hover:bg-blue-600"
                            >
                                {view === 'grid' ? 'List View' : 'Grid View'}
                            </button>
                        </div>
                    </div>
    
                    <PokemonTypeFilter
                        availableTypes={allTypes}
                        selectedTypes={selectedTypes}
                        onTypeSelect={setSelectedTypes}
                    />
                </div>
    
                <div className={`grid gap-6 ${
                    view === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                        : 'grid-cols-1 max-w-3xl mx-auto'
                }`}>
                    {paginatedPokemon.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.id}
                            {...pokemon}
                        />
                    ))}
                </div>
    
                {sortedPokemon.length > itemsPerPage && (
                    <div className="mt-8 flex justify-center gap-4 items-center">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="control-button bg-blue-500 hover:bg-blue-600"
                        >
                            Previous
                        </button>
                        <span className="text-gray-700 font-medium">
                            Page {currentPage} of {Math.ceil(sortedPokemon.length / itemsPerPage)}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage >= Math.ceil(sortedPokemon.length / itemsPerPage)}
                            className="control-button bg-blue-500 hover:bg-blue-600"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokedexGrid;