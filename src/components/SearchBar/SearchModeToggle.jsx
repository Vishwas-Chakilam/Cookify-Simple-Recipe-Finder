import React from 'react';
import { FaListUl, FaSearch } from 'react-icons/fa';

const SearchModeToggle = ({ mode, onModeChange }) => (
  <div className="flex justify-center mb-4">
    <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white shadow-sm">
      <button
        onClick={() => onModeChange('ingredients')}
        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          mode === 'ingredients'
            ? 'bg-orange-500 text-white'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <FaListUl className="mr-2" />
        By Ingredients
      </button>
      <button
        onClick={() => onModeChange('recipe')}
        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          mode === 'recipe'
            ? 'bg-orange-500 text-white'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <FaSearch className="mr-2" />
        By Recipe Name
      </button>
    </div>
  </div>
);