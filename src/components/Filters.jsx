import React from 'react';
import { FaLeaf, FaCarrot, FaBreadSlice, FaDumbbell } from 'react-icons/fa';
import { clsx } from 'clsx';
import FilterButton from './FilterButton';

const Filters = ({ filters, setFilters, onReset }) => {
  const toggleFilter = (filter) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-3 items-center justify-center mb-4">
        <FilterButton
          active={filters.vegetarian}
          onClick={() => toggleFilter('vegetarian')}
          icon={FaLeaf}
        >
          Vegetarian
        </FilterButton>
        <FilterButton
          active={filters.vegan}
          onClick={() => toggleFilter('vegan')}
          icon={FaCarrot}
        >
          Vegan
        </FilterButton>
        <FilterButton
          active={filters.glutenFree}
          onClick={() => toggleFilter('glutenFree')}
          icon={FaBreadSlice}
        >
          Gluten Free
        </FilterButton>
        <FilterButton
          active={filters.highProtein}
          onClick={() => toggleFilter('highProtein')}
          icon={FaDumbbell}
        >
          High Protein
        </FilterButton>
      </div>
      {Object.values(filters).some(Boolean) && (
        <button
          onClick={onReset}
          className="mx-auto block text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default Filters;