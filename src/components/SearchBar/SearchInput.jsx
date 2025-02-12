import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from '../../utils/debounce';
import { searchRecipesByName } from '../../utils/api';

const SearchInput = ({ query, onChange, onSearch, mode }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = debounce(async (value) => {
    if (mode === 'recipe' && value.length >= 2) {
      try {
        const results = await searchRecipesByName(value);
        setSuggestions(results.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch();
  };

  const placeholder = mode === 'ingredients'
    ? "Enter ingredients (use '!' for must-have items, e.g: !chicken, tomato, onion)"
    : "Search by recipe name";

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-6 py-4 rounded-2xl border-2 border-orange-100 
                     focus:border-orange-300 focus:ring focus:ring-orange-200 
                     focus:ring-opacity-50 pl-14 text-lg"
          />
          <button
            type="submit"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 
                     text-orange-500 hover:text-orange-600 transition-colors"
          >
            <FaSearch size={24} />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => {
                  onChange(suggestion.title);
                  setShowSuggestions(false);
                  onSearch();
                }}
                className="w-full px-4 py-2 text-left hover:bg-orange-50 transition-colors"
              >
                {suggestion.title}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;