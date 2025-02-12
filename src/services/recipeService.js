import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (params) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        ...params,
        addRecipeNutrition: true,
        addRecipeInformation: true,
      },
    });
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        addRecipeNutrition: true,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const getWinePairing = async (food) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/food/wine/pairing`, {
      params: {
        apiKey: API_KEY,
        food,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching wine pairing:', error);
    throw error;
  }
};