import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MealRecommendation } from '../../../services/mealRecommendation';

const MealRecommender = () => {
  const [preferences, setPreferences] = useState({
    minCalories: 200,
    maxCalories: 800,
    minProtein: 20,
    diet: '',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const meals = await MealRecommendation.getMealSuggestions(preferences);
      setRecommendations(meals);
    } catch (error) {
      setError('Failed to fetch recommendations. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewRecipe = (meal) => {
    navigate(`/recipe/${meal.id}`);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Calories
            </label>
            <input
              type="number"
              value={preferences.minCalories}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  minCalories: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                       transition-all duration-200"
              min="0"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Calories
            </label>
            <input
              type="number"
              value={preferences.maxCalories}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  maxCalories: Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                       transition-all duration-200"
              min="0"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Protein (g)
          </label>
          <input
            type="number"
            value={preferences.minProtein}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                minProtein: Number(e.target.value),
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                     focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                     transition-all duration-200"
            min="0"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Preference
          </label>
          <select
            value={preferences.diet}
            onChange={(e) =>
              setPreferences({
                ...preferences,
                diet: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-200 
                     focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                     transition-all duration-200 bg-white appearance-none"
          >
            <option value="">Any Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten Free</option>
          </select>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                   text-white rounded-lg font-medium shadow-md hover:shadow-lg 
                   transition-all duration-200 disabled:opacity-50 
                   disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Finding Meals...
            </span>
          ) : (
            'Get Recommendations'
          )}
        </motion.button>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-red-50 text-red-600 rounded-lg text-center"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Recommended Meals
            </h3>
            {recommendations.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm 
                         hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-800">{meal.title}</h4>
                    <p className="text-sm text-gray-600">
                      Calories: {meal.calories} | Protein: {meal.protein}g
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewRecipe(meal)}
                    className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg 
                             font-medium hover:bg-orange-200 transition-colors"
                  >
                    View Recipe
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealRecommender;