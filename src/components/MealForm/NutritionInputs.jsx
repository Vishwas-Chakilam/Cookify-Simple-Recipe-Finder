import React from 'react';

const NutritionInput = ({ label, name, value, error, disabled, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      min="0"
      step="0.1"
      className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 
               focus:ring-orange-500 disabled:bg-gray-100"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const NutritionInputs = ({ nutrition, isCustomMeal, errors, onChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <NutritionInput
      label="Calories"
      name="calories"
      value={nutrition.calories}
      error={errors.calories}
      disabled={!isCustomMeal}
      onChange={onChange}
    />
    <NutritionInput
      label="Protein (g)"
      name="protein"
      value={nutrition.protein}
      error={errors.protein}
      disabled={!isCustomMeal}
      onChange={onChange}
    />
    <NutritionInput
      label="Carbohydrates (g)"
      name="carbohydrates"
      value={nutrition.carbohydrates}
      error={errors.carbohydrates}
      disabled={!isCustomMeal}
      onChange={onChange}
    />
    <NutritionInput
      label="Fat (g)"
      name="fat"
      value={nutrition.fat}
      error={errors.fat}
      disabled={!isCustomMeal}
      onChange={onChange}
    />
  </div>
);