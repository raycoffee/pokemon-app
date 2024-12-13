import React from 'react';

interface PokemonCardProps {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, sprite }) => {
    return (
        <div className="p-4 border rounded shadow-md w-64 bg-white flex flex-col items-center hover:shadow-lg transition-shadow">
            <img src={sprite} alt={name} className="w-24 h-24 object-cover" />
            <h2 className="text-xl font-bold mt-2">{name}</h2>
            <p className="text-gray-500">#{id}</p>
            <div className="flex space-x-2 mt-2">
                {types.map((type) => (
                    <span
                        key={type}
                        className="text-sm px-2 py-1 rounded bg-gray-200 text-gray-700"
                    >
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PokemonCard;