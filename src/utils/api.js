import axios from 'axios';

const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const API_BASE_URL = 'https://api.spoonacular.com/recipes';

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: SPOONACULAR_API_KEY,
  },
});

export const fetchRecipes = async (ingredients) => {
  // Parse ingredients to separate must-have and optional
  const parsedIngredients = ingredients.split(',').map(i => i.trim());
  const mustHave = parsedIngredients.filter(i => i.startsWith('!')).map(i => i.slice(1));
  const optional = parsedIngredients.filter(i => !i.startsWith('!'));

  try {
    const { data: recipes } = await api.get('/findByIngredients', {
      params: {
        ingredients: [...mustHave, ...optional].join(','),
        number: 12,
        ranking: 2,
        ignorePantry: true,
      },
    });

    // Filter recipes to ensure they contain all must-have ingredients
    const filteredRecipes = recipes.filter(recipe => {
      const recipeIngredients = recipe.usedIngredients.map(i => i.name.toLowerCase());
      return mustHave.every(ingredient => 
        recipeIngredients.some(ri => ri.includes(ingredient.toLowerCase()))
      );
    });

    // Fetch additional details for each recipe
    const detailedRecipes = await Promise.all(
      filteredRecipes.map(async (recipe) => {
        const { data: details } = await api.get(`/${recipe.id}/information`);
        return {
          ...recipe,
          preparationMinutes: details.preparationMinutes,
          difficulty: calculateDifficulty(details),
          rating: details.spoonacularScore / 20, // Convert to 5-star rating
          dietaryTags: getDietaryTags(details),
          sourceUrl: details.sourceUrl,
        };
      })
    );

    return detailedRecipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const searchRecipesByName = async (query) => {
  try {
    const { data } = await api.get('/complexSearch', {
      params: {
        query,
        number: 12,
        addRecipeInformation: true,
        fillIngredients: true,
      },
    });

    return data.results.map(recipe => ({
      ...recipe,
      preparationMinutes: recipe.preparationMinutes,
      difficulty: calculateDifficulty(recipe),
      rating: recipe.spoonacularScore / 20,
      dietaryTags: getDietaryTags(recipe),
      usedIngredients: recipe.extendedIngredients || [],
      missedIngredients: [],
    }));
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

const calculateDifficulty = (recipe) => {
  const factors = {
    preparationMinutes: recipe.preparationMinutes || 0,
    ingredients: recipe.extendedIngredients?.length || 0,
    steps: recipe.analyzedInstructions?.[0]?.steps?.length || 0,
  };

  if (factors.preparationMinutes > 60 || factors.ingredients > 12 || factors.steps > 10) {
    return 'Hard';
  } else if (factors.preparationMinutes > 30 || factors.ingredients > 7 || factors.steps > 5) {
    return 'Medium';
  }
  return 'Easy';
};

const getDietaryTags = (recipe) => {
  const tags = [];
  if (recipe.vegetarian) tags.push('Vegetarian');
  if (recipe.vegan) tags.push('Vegan');
  if (recipe.glutenFree) tags.push('Gluten-Free');
  if (recipe.dairyFree) tags.push('Dairy-Free');
  return tags;
};