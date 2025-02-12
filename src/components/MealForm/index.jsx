import React from 'react';
import { motion } from 'framer-motion';
import MealInput from './MealInput';
import NutritionInputs from './NutritionInputs';
import { useMealForm } from './useMealForm';

const MealForm = ({ onAddMeal }) => {
  const {
    meal,
    isCustomMeal,
    isLoading,
    errors,
    handleChange,
    handleSubmit,
    toggleCustomMeal,
    handleFetchNutrition,
  } = useMealForm(onAddMeal);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Add Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <MealInput
          meal={meal}
          isCustomMeal={isCustomMeal}
          isLoading={isLoading}
          error={errors.title}
          onChange={handleChange}
          onFetch={handleFetchNutrition}
          onToggleMode={toggleCustomMeal}
        />
        
        <NutritionInputs
          nutrition={meal.nutrition}
          isCustomMeal={isCustomMeal}
          errors={errors}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Meal
          </button>
        </div>
      </form>
    </motion.div>
  );
};