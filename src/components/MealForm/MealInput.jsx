import React from 'react';

const MealInput = ({
  meal,
  isCustomMeal,
  isLoading,
  error,
  onChange,
  onFetch,
  onToggleMode
}) => (
  <div className="space-y-2">
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Meal Title
      </label>
      <input
        type="text"
        name="title"
        value={meal.title}
        onChange={onChange}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 
                 focus:ring-orange-500"
        disabled={isCustomMeal}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>

    <div className="flex gap-2">
      {!isCustomMeal && (
        <button
          type="button"
          onClick={onFetch}
          disabled={isLoading || !meal.title.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Fetching..." : "Fetch Nutrition"}
        </button>
      )}
      
      <button
        type="button"
        onClick={onToggleMode}
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        {isCustomMeal ? "Switch to API Mode" : "Enter Custom Nutrition"}
      </button>
    </div>
  </div>
);