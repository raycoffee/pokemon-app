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
  const [sortOption, setSortOption] = useState<'name' | 'id' | 'type'>('name');
  const [view, setView] = useState<'grid' | 'list'>(initialView);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);


  const allTypes = Array.from(new Set(pokemonList.flatMap((p) => p.types))).sort();


  const filteredPokemon = pokemonList.filter((pokemon) => {
    const query = searchQuery.toLowerCase();
    const matchesName = pokemon.name.toLowerCase().includes(query);
    const matchesType = pokemon.types.some((type) => type.toLowerCase().includes(query));
    const matchesSearch = matchesName || matchesType;


    const matchesTypeFilter =
      selectedTypes.length === 0 ||
      selectedTypes.every((selectedType) => pokemon.types.includes(selectedType));

    return matchesSearch && matchesTypeFilter;
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


  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPokemon = sortedPokemon.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="mb-4 space-y-4">

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name or type..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="border p-2 rounded"
          />

          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value as 'name' | 'id' | 'type');
              setCurrentPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value="name">Name</option>
            <option value="id">ID</option>
            <option value="type">Type</option>
          </select>

          <button
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            className="border p-2 rounded"
          >
            {view === 'grid' ? 'Switch to List' : 'Switch to Grid'}
          </button>
        </div>


        <PokemonTypeFilter
          availableTypes={allTypes}
          selectedTypes={selectedTypes}
          onTypeSelect={(types) => {
            setSelectedTypes(types);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-4' : 'grid-cols-1'}`}>
        {paginatedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            sprite={pokemon.sprite}
          />
        ))}
      </div>


      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => {
            if (paginatedPokemon.length === itemsPerPage) {
              setCurrentPage((prev) => prev + 1);
            }
          }}
          disabled={paginatedPokemon.length < itemsPerPage}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokedexGrid;
