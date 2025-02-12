import React from 'react';

const NutritionGoals = ({ calories, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Target Daily Calories
    </label>
    <input
      type="number"
      min="1000"
      max="5000"
      step="50"
      value={calories}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
    />
  </div>
);