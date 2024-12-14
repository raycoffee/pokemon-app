import React from 'react';

interface PokemonCardProps {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}


type PokemonType = 
    | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' 
    | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' 
    | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';


const typeColors: Record<PokemonType, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, sprite }) => {
    const separateTypes = types[0].includes('poison') ? 
        [types[0].replace('poison', ''), 'poison'] : 
        types;

    return (
        <div className="pokemon-card group">
            <div className="absolute top-3 right-3">
                <div className="text-sm font-mono text-gray-500">
                    #{id.toString().padStart(3, '0')}
                </div>
            </div>
            
            <div className="relative">
                <div className="absolute inset-0 bg-gray-50 rounded-lg -z-10 
                    group-hover:bg-gray-100 transition-colors duration-300" />
                <img 
                    src={sprite} 
                    alt={name}
                    className="w-32 h-32 mx-auto relative z-10 
                        transition-transform duration-300 group-hover:scale-110" 
                />
            </div>
            
            <h2 className="text-xl font-bold capitalize mt-4 mb-3 text-center">
                {name}
            </h2>
            
            <div className="flex flex-wrap gap-2 justify-center">
                {separateTypes.map((type) => (
                    <span
                        key={type}
                        className={`type-badge ${typeColors[type.toLowerCase() as PokemonType] || 'bg-gray-400'}`}
                    >
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
};
export default PokemonCard;