import React from 'react';
import { motion } from 'framer-motion';

const SavedMeals = ({ meals, onSelect }) => {
  if (!meals.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4"
    >
      <h3 className="text-lg font-semibold mb-2">Frequently Used Meals</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {meals.map((meal) => (
          <button
            key={meal.id}
            onClick={() => onSelect(meal)}
            className="p-2 text-left bg-gray-50 rounded-md hover:bg-gray-100"
          >
            <p className="font-medium">{meal.name}</p>
            <p className="text-sm text-gray-600">{meal.calories} kcal</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
};