import React from 'react';
import { motion } from 'framer-motion';

const NutritionSummary = ({ nutrition }) => {
  const nutrients = [
    { label: 'Calories', value: nutrition.calories, unit: 'kcal' },
    { label: 'Protein', value: nutrition.protein, unit: 'g' },
    { label: 'Carbs', value: nutrition.carbohydrates, unit: 'g' },
    { label: 'Fat', value: nutrition.fat, unit: 'g' },
    { label: 'Fiber', value: nutrition.fiber, unit: 'g' },
    { label: 'Sugar', value: nutrition.sugar, unit: 'g' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm"
    >
      {nutrients.map(({ label, value, unit }) => (
        <div key={label} className="text-center p-2 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-lg font-semibold">
            {Math.round(value * 10) / 10} {unit}
          </p>
        </div>
      ))}
    </motion.div>
  );
};