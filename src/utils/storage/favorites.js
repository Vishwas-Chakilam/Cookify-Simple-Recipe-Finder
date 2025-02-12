// Storage key for favorites
const FAVORITES_KEY = 'recipe_favorites';

export const toggleFavorite = (recipe) => {
  const favorites = getFavorites();
  const isFavorite = favorites.some(fav => fav.id === recipe.id);
  
  const updatedFavorites = isFavorite
    ? favorites.filter(fav => fav.id !== recipe.id)
    : [...favorites, { ...recipe, addedAt: new Date().toISOString() }];
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return !isFavorite;
};

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const clearFavorites = () => {
  localStorage.removeItem(FAVORITES_KEY);
};