import { useState, useEffect } from 'react';
import { toggleFavorite, getFavorites } from '../../../utils/historyStorage';

export const useFavorite = (recipeId) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.some(fav => fav.id === recipeId));
  }, [recipeId]);

  const handleFavoriteToggle = (recipe) => {
    const newIsFavorite = toggleFavorite(recipe);
    setIsFavorite(newIsFavorite);
    return newIsFavorite;
  };

  return { isFavorite, handleFavoriteToggle };
};