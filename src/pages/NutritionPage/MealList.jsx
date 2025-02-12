import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MealCard from './components/MealCard';

const MealList = ({ meals, onRemoveMeal }) => {
  if (!meals.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No meals added yet. Start by adding your first meal!
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Today's Meals</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onRemove={onRemoveMeal}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MealList;