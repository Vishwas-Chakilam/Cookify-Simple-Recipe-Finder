import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const MealRecommendation = {
  // Get meal suggestions based on nutritional goals
  getMealSuggestions: async (nutrients) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/findByNutrients`, {
        params: {
          apiKey: API_KEY,
          ...nutrients,
          number: 5
        }
      });

      // Fetch additional details for each recipe to get the sourceUrl
      const detailedRecipes = await Promise.all(
        data.map(async (recipe) => {
          const { data: details } = await axios.get(`${BASE_URL}/${recipe.id}/information`, {
            params: { apiKey: API_KEY }
          });
          return {
            ...recipe,
            sourceUrl: details.sourceUrl,
            title: details.title
          };
        })
      );

      return detailedRecipes;
    } catch (error) {
      console.error('Error fetching meal suggestions:', error);
      throw error;
    }
  },

  // Get meal recommendations based on diet preferences
  getDietaryRecommendations: async (preferences) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/complexSearch`, {
        params: {
          apiKey: API_KEY,
          ...preferences,
          addRecipeInformation: true
        }
      });
      return data;
    } catch (error) {
      console.error('Error fetching dietary recommendations:', error);
      throw error;
    }
  }
};