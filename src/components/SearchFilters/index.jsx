import React, { memo } from 'react';
import { motion } from 'framer-motion';
import DietaryFilters from './DietaryFilters';
import TimeFilter from './TimeFilter';
import CuisineFilter from './CuisineFilter';

const SearchFilters = memo(({ filters, onChange }) => {
  const handleFilterChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <DietaryFilters
        selectedDiets={filters.diets || []}
        onChange={(diets) => handleFilterChange('diets', diets)}
      />
      <TimeFilter
        value={filters.maxReadyTime}
        onChange={(time) => handleFilterChange('maxReadyTime', time)}
      />
      <CuisineFilter
        value={filters.cuisine}
        onChange={(cuisine) => handleFilterChange('cuisine', cuisine)}
      />
    </motion.div>
  );
});

SearchFilters.displayName = 'SearchFilters';

export default SearchFilters;