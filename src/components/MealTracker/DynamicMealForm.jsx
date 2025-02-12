import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analyzeMealQuery } from '../../services/nutritionAPI';
import { debounce } from '../../utils/debounce';

const DynamicMealForm = ({ onAddMeal }) => {
  const [meal, setMeal] = useState({ title: '', nutrition: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const analyzeMeal = debounce(async (title) => {
    if (!title.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const nutrition = await analyzeMealQuery(title);
      setMeal(prev => ({ ...prev, nutrition }));
    } catch (err) {
      setError('Could not analyze meal. Would you like to add a custom meal?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setMeal(prev => ({ ...prev, title }));
    if (!isCustomMode) {
      analyzeMeal(title);
    }
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setMeal(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [name]: Number(value) || 0
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meal.title) return;

    onAddMeal({
      ...meal,
      id: Date.now().toString(),
      date: new Date().toISOString()
    });

    // Reset form
    setMeal({ title: '', nutrition: {} });
    setIsCustomMode(false);
    setError('');
  };

  const toggleCustomMode = () => {
    setIsCustomMode(!isCustomMode);
    setError('');
    setMeal(prev => ({
      ...prev,
      nutrition: {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Add Meal</h2>
        <button
          type="button"
          onClick={toggleCustomMode}
          className="text-sm text-orange-500 hover:text-orange-600"
        >
          {isCustomMode ? 'Switch to API Mode' : 'Add Custom Meal'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meal Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={meal.title}
              onChange={handleTitleChange}
              placeholder="Enter meal name..."
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              required
            />
            {!isCustomMode && loading && (
              <div className="absolute right-3 top-2">
                <div className="animate-spin h-5 w-5 border-2 border-orange-500 rounded-full border-t-transparent" />
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="flex items-center justify-between bg-orange-50 p-4 rounded-md">
            <p className="text-orange-700 text-sm">{error}</p>
            {!isCustomMode && (
              <button
                type="button"
                onClick={toggleCustomMode}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Add Custom Meal
              </button>
            )}
          </div>
        )}

        {(isCustomMode || meal.nutrition.calories) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calories
              </label>
              <input
                type="number"
                name="calories"
                value={meal.nutrition.calories || ''}
                onChange={handleNutritionChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                disabled={!isCustomMode}
                required={isCustomMode}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                name="protein"
                value={meal.nutrition.protein || ''}
                onChange={handleNutritionChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                disabled={!isCustomMode}
                required={isCustomMode}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carbohydrates (g)
              </label>
              <input
                type="number"
                name="carbohydrates"
                value={meal.nutrition.carbohydrates || ''}
                onChange={handleNutritionChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                disabled={!isCustomMode}
                required={isCustomMode}
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                name="fat"
                value={meal.nutrition.fat || ''}
                onChange={handleNutritionChange}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                disabled={!isCustomMode}
                required={isCustomMode}
                min="0"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!meal.title || (!isCustomMode && !meal.nutrition.calories)}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Meal
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default DynamicMealForm;