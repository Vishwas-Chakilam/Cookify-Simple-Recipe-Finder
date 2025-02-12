export const applyFilters = (recipes, filters) => {
  let filteredRecipes = [...recipes];

  if (filters.vegetarian) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.vegetarian);
  }
  if (filters.vegan) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.vegan);
  }
  if (filters.glutenFree) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.glutenFree);
  }
  if (filters.highProtein) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.protein > 20);
  }

  return filteredRecipes;
};