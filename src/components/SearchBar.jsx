import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ ingredients, setIngredients, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
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
  );
};
export default SearchBar;
