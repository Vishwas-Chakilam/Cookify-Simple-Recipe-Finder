import React from 'react';
import { motion } from 'framer-motion';
import NutritionChart from '../../components/MealPlanner/NutritionChart';
import { calculateDailyNutrition } from '../../utils/nutritionCalculator';

const roundNutritionValues = (nutrition) => {
  return Object.fromEntries(
    Object.entries(nutrition).map(([key, value]) => [key, Math.round(value)])
  );
};

const DailyProgress = ({ goals, meals }) => {
  const dailyNutrition = calculateDailyNutrition(meals);
  const roundedDailyNutrition = roundNutritionValues(dailyNutrition);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Daily Progress</h2>
      <NutritionChart current={roundedDailyNutrition} goals={goals} />
    </motion.div>
  );
};

export default DailyProgress;
