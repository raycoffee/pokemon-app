import React from 'react';

interface PokemonTypeFilterProps {
    availableTypes: string[];
    selectedTypes: string[];
    onTypeSelect: (types: string[]) => void;
}


type PokemonType = 
    | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' 
    | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' 
    | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';


const typeColors: Record<PokemonType, string> = {
    normal: 'bg-gray-400 hover:bg-gray-500',
    fire: 'bg-red-500 hover:bg-red-600',
    water: 'bg-blue-500 hover:bg-blue-600',
    electric: 'bg-yellow-400 hover:bg-yellow-500',
    grass: 'bg-green-500 hover:bg-green-600',
    ice: 'bg-blue-200 hover:bg-blue-300',
    fighting: 'bg-red-700 hover:bg-red-800',
    poison: 'bg-purple-500 hover:bg-purple-600',
    ground: 'bg-yellow-600 hover:bg-yellow-700',
    flying: 'bg-indigo-400 hover:bg-indigo-500',
    psychic: 'bg-pink-500 hover:bg-pink-600',
    bug: 'bg-lime-500 hover:bg-lime-600',
    rock: 'bg-yellow-800 hover:bg-yellow-900',
    ghost: 'bg-purple-700 hover:bg-purple-800',
    dragon: 'bg-indigo-700 hover:bg-indigo-800',
    dark: 'bg-gray-700 hover:bg-gray-800',
    steel: 'bg-gray-500 hover:bg-gray-600',
    fairy: 'bg-pink-300 hover:bg-pink-400',
};

const PokemonTypeFilter: React.FC<PokemonTypeFilterProps> = ({
    availableTypes,
    selectedTypes,
    onTypeSelect,
}) => {
    const toggleType = (type: string) => {
        if (selectedTypes.includes(type)) {
            onTypeSelect(selectedTypes.filter((t) => t !== type));
        } else {
            onTypeSelect([...selectedTypes, type]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {availableTypes.map((type) => {
                const isSelected = selectedTypes.includes(type);
                const typeColor = typeColors[type.toLowerCase() as PokemonType] || 'bg-gray-400 hover:bg-gray-500';
                
                return (
                    <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`
                            ${typeColor}
                            ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                            px-4 py-2 rounded-full text-white font-medium capitalize
                            transition-all duration-200 ease-in-out
                        `}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
};

export default PokemonTypeFilter;