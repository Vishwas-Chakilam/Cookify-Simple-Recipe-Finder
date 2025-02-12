import React from 'react';

const SearchFilters = ({ filters, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Dietary Restrictions</h3>
        <div className="flex flex-wrap gap-2">
          {['Gluten Free', 'Vegetarian', 'Vegan', 'Keto'].map((diet) => (
            <label key={diet} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.diets?.includes(diet.toLowerCase())}
                onChange={(e) => {
                  const value = diet.toLowerCase();
                  onChange({
                    ...filters,
                    diets: e.target.checked
                      ? [...(filters.diets || []), value]
                      : filters.diets?.filter((d) => d !== value),
                  });
                }}
                className="rounded text-orange-500 focus:ring-orange-500"
              />
              <span>{diet}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Cooking Time</h3>
        <select
          value={filters.maxReadyTime || ''}
          onChange={(e) =>
            onChange({ ...filters, maxReadyTime: e.target.value })
          }
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="">Any Time</option>
          <option value="15">15 minutes or less</option>
          <option value="30">30 minutes or less</option>
          <option value="60">1 hour or less</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Cuisine Type</h3>
        <select
          value={filters.cuisine || ''}
          onChange={(e) => onChange({ ...filters, cuisine: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="">Any Cuisine</option>
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="asian">Asian</option>
          <option value="mediterranean">Mediterranean</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;