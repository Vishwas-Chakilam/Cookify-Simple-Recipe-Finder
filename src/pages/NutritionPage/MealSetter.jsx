import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MealSetter = ({ onAddMeal }) => {
  const [meal, setMeal] = useState({
    title: '',
    nutrition: { calories: 0, protein: 0, carbohydrates: 0, fat: 0 },
  });
  const [isCustomMeal, setIsCustomMeal] = useState(false); // Toggle for custom/manual mode
  const [isLoading, setIsLoading] = useState(false); // Loader for API calls

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in meal.nutrition) {
      setMeal({
        ...meal,
        nutrition: { ...meal.nutrition, [name]: Number(value) },
      });
    } else {
      setMeal({ ...meal, [name]: value });
    }
  };

  const fetchNutrition = async (mealTitle) => {
    try {
      setIsLoading(true);
      const apiKey = "YOUR_SPOONACULAR_API_KEY"; // Replace with your Spoonacular API key
      const response = await fetch(
        `https://api.spoonacular.com/recipes/guessNutrition?title=${mealTitle}&apiKey=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setMeal((prev) => ({
          ...prev,
          nutrition: {
            calories: data.calories.value || 0,
            protein: data.protein.value || 0,
            carbohydrates: data.carbs.value || 0,
            fat: data.fat.value || 0,
          },
        }));
      } else {
        console.error("Error fetching data:", data);
        alert("Could not fetch nutrition data. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMeal(meal);
    setMeal({
      title: '',
      nutrition: { calories: 0, protein: 0, carbohydrates: 0, fat: 0 },
    });
  };

  const toggleCustomMeal = () => {
    setIsCustomMeal((prev) => !prev);
    // Reset nutrition values when switching modes
    setMeal({
      ...meal,
      nutrition: { calories: 0, protein: 0, carbohydrates: 0, fat: 0 },
    });
  };

  const handleFetchClick = () => {
    if (meal.title.trim() !== "") {
      fetchNutrition(meal.title);
    } else {
      alert("Please enter a meal title.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Set Your Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meal Title
          </label>
          <input
            type="text"
            name="title"
            value={meal.title}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            disabled={isCustomMeal} // Disable input when in custom mode
          />
          {!isCustomMeal && (
            <button
              type="button"
              onClick={handleFetchClick}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isLoading ? "Fetching..." : "Fetch Nutrition"}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={toggleCustomMeal}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {isCustomMeal ? "Switch to API Mode" : "Enter Custom Nutrition"}
        </button>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Calories
          </label>
          <input
            type="number"
            name="calories"
            value={meal.nutrition.calories}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            disabled={!isCustomMeal}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Protein (g)
          </label>
          <input
            type="number"
            name="protein"
            value={meal.nutrition.protein}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            disabled={!isCustomMeal}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Carbohydrates (g)
          </label>
          <input
            type="number"
            name="carbohydrates"
            value={meal.nutrition.carbohydrates}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            disabled={!isCustomMeal}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fat (g)
          </label>
          <input
            type="number"
            name="fat"
            value={meal.nutrition.fat}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            disabled={!isCustomMeal}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Add Meal
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default MealSetter;
