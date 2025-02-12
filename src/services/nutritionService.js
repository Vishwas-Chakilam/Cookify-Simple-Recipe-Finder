import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const getNutritionInfo = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}/nutritionWidget.json`, {
      params: { apiKey: API_KEY },
    });
    return data;
  } catch (error) {
    console.error('Error fetching nutrition info:', error);
    throw error;
  }
};

export const analyzeRecipe = async (ingredients) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/parseIngredients`,
      ingredients,
      {
        params: { apiKey: API_KEY },
      }
    );
    return data;
  } catch (error) {
    console.error('Error analyzing recipe:', error);
    throw error;
  }
};