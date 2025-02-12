import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateMealPlan } from '../../services/mealPlanService';
import useMealPlanStore from '../../stores/mealPlanStore';

const MealPlanGenerator = () => {
  const [preferences, setPreferences] = useState({
    targetCalories: 2000,
    diet: '',
    exclude: '',
  });
  const [loading, setLoading] = useState(false);
  const { setMealPlan } = useMealPlanStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const plan = await generateMealPlan(preferences);
      setMealPlan(plan);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Generate Meal Plan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Target Calories
          </label>
          <input
            type="number"
            value={preferences.targetCalories}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                targetCalories: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Diet
          </label>
          <select
            value={preferences.diet}
            onChange={(e) =>
              setPreferences({ ...preferences, diet: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option value="">Any</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten Free</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>
    </motion.div>
  );
};