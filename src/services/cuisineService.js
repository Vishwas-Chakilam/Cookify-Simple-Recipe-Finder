import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

export const getEquipment = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/recipes/${id}/equipmentWidget.json`, {
      params: { apiKey: API_KEY },
    });
    return data;
  } catch (error) {
    console.error('Error fetching equipment:', error);
    throw error;
  }
};

export const getSubstitutes = async (ingredient) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/food/ingredients/substitutes`, {
      params: {
        apiKey: API_KEY,
        ingredientName: ingredient,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching substitutes:', error);
    throw error;
  }
};