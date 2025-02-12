import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/mealplanner';

export const generateMealPlan = async (params) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/generate`, {
      params: {
        apiKey: API_KEY,
        ...params,
      },
    });
    return data;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
};

export const generateShoppingList = async (meals) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/shopping-list`, {
      apiKey: API_KEY,
      meals,
    });
    return data;
  } catch (error) {
    console.error('Error generating shopping list:', error);
    throw error;
  }
};