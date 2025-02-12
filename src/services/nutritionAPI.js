import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

// Create axios instance with common config
const api = axios.create({
  baseURL: BASE_URL,
  params: { apiKey: API_KEY },
});

// Cache for meal search results
const searchCache = new Map();

export const searchMeals = async (query) => {
  // Check cache first
  const cacheKey = query.toLowerCase();
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  try {
    const { data } = await api.get('/recipes/autocomplete', {
      params: { query, number: 5 }
    });
    
    // Cache the results
    searchCache.set(cacheKey, data);
    
    // Clear old cache entries if cache gets too large
    if (searchCache.size > 100) {
      const oldestKey = searchCache.keys().next().value;
      searchCache.delete(oldestKey);
    }
    
    return data;
  } catch (error) {
    console.error('Error searching meals:', error);
    throw error;
  }
};

export const analyzeMealQuery = async (query) => {
  try {
    const { data } = await api.get('/recipes/guessNutrition', {
      params: { title: query }
    });
    return {
      calories: data.calories.value,
      protein: data.protein.value,
      carbohydrates: data.carbs.value,
      fat: data.fat.value
    };
  } catch (error) {
    console.error('Error analyzing meal:', error);
    throw error;
  }
};