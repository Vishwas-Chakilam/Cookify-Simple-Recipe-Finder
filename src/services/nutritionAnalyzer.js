import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/food';

export const NutritionAnalyzer = {
  // Analyze recipe ingredients
  analyzeRecipe: async (ingredients) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/ingredients/map`, {
        ingredients,
        apiKey: API_KEY
      });
      return data;
    } catch (error) {
      console.error('Error analyzing recipe:', error);
      throw error;
    }
  },

  // Get detailed nutrition information
  getNutritionInfo: async (query) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/ingredients/search`, {
        params: {
          query,
          apiKey: API_KEY,
          addNutrition: true
        }
      });
      return data;
    } catch (error) {
      console.error('Error fetching nutrition info:', error);
      throw error;
    }
  },

  // Calculate recipe nutrition
  calculateRecipeNutrition: (ingredients) => {
    return ingredients.reduce((total, ingredient) => ({
      calories: total.calories + ingredient.nutrition.calories,
      protein: total.protein + ingredient.nutrition.protein,
      carbs: total.carbs + ingredient.nutrition.carbs,
      fat: total.fat + ingredient.nutrition.fat,
      fiber: total.fiber + ingredient.nutrition.fiber,
      sugar: total.sugar + ingredient.nutrition.sugar
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0
    });
  }
};