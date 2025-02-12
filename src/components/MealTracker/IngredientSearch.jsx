import React, { useState } from 'react';
import { searchIngredients } from '../../services/nutritionAPI';
import { debounce } from '../../utils/debounce';

const IngredientSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchDebounced = debounce(async (value) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const ingredients = await searchIngredients(value);
      setResults(ingredients);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchDebounced(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search ingredients..."
        className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
      />
      
      {loading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin h-4 w-4 border-2 border-orange-500 rounded-full border-t-transparent" />
        </div>
      )}

      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((ingredient) => (
            <li
              key={ingredient.id}
              onClick={() => {
                onSelect(ingredient);
                setQuery('');
                setResults([]);
              }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
            >
              {ingredient.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};