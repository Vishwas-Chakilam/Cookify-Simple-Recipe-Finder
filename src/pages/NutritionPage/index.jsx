import React from 'react';
import { motion } from 'framer-motion';
import NutritionGoals from './NutritionGoals';
import DailyProgress from './DailyProgress';
import MealList from './MealList';
import PageTransition from '../../components/PageTransition';
import useMealPlanStore from '../../stores/mealPlanStore';
import DynamicMealForm from '../../components/MealTracker/DynamicMealForm';

const NutritionPage = () => {
  const { 
    nutritionGoals, 
    mealPlan, 
    updateNutritionGoals, 
    addMeal,
    removeMeal 
  } = useMealPlanStore();

  // Ensure we always have an array of meals
  const meals = mealPlan?.meals || [];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nutrition Tracker
            </h1>
            <p className="text-gray-600">
              Monitor your daily nutrition and track your goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NutritionGoals
              goals={nutritionGoals}
              onUpdate={updateNutritionGoals}
            />
            <DailyProgress
              goals={nutritionGoals}
              meals={meals}
            />
          </div>

          <DynamicMealForm onAddMeal={addMeal} />
          <MealList meals={meals} onRemoveMeal={removeMeal} />
        </div>
      </div>
    </PageTransition>
  );
};

export default NutritionPage;