import React from 'react';

interface PokemonTypeFilterProps {
    availableTypes: string[];
    selectedTypes: string[];
    onTypeSelect: (types: string[]) => void;
}

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
                return (
                    <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`px-3 py-1 rounded ${isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        {type}
                    </button>
                );
            })}
        </div>
    );
};

export default PokemonTypeFilter;
