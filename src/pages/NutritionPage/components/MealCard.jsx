import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { formatDate } from '../../../utils/dateFormatter';

const MealCard = ({ meal, onRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -100 }}
    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex justify-between items-center"
  >
    <div>
      <h3 className="font-medium">{meal.title}</h3>
      <p className="text-sm text-gray-500">{formatDate(meal.date)}</p>
      <div className="mt-2 text-sm text-gray-600 space-x-4">
        <span>Calories: {meal.nutrition.calories}</span>
        <span>Protein: {meal.nutrition.protein}g</span>
        <span>Carbs: {meal.nutrition.carbohydrates}g</span>
        <span>Fat: {meal.nutrition.fat}g</span>
      </div>
    </div>
    <button
      onClick={() => onRemove(meal.id)}
      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
    >
      <FaTrash />
    </button>
  </motion.div>
);

export default MealCard;