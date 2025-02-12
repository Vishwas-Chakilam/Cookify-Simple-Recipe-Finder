import React from 'react';

const MealFrequency = ({ mealsPerDay, duration, onMealsChange, onDurationChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Meals per Day
      </label>
      <select
        value={mealsPerDay}
        onChange={(e) => onMealsChange(Number(e.target.value))}
        className="w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
      >
        {[2, 3, 4, 5, 6].map(num => (
          <option key={num} value={num}>{num} meals</option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Duration (Days)
      </label>
      <select
        value={duration}
        onChange={(e) => onDurationChange(Number(e.target.value))}
        className="w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
      >
        {[1, 3, 7, 14, 28].map(days => (
          <option key={days} value={days}>{days} days</option>
        ))}
      </select>
    </div>
  </div>
);