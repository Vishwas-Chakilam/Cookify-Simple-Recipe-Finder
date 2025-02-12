import React, { useState, useEffect, memo } from 'react';
import RecipeHeader from './RecipeHeader';
import IngredientList from './IngredientList';
import RecipeFooter from './RecipeFooter';
import FavoriteButton from '../FavoriteButton';
import { toggleFavorite, getFavorites } from '../../utils/historyStorage';

const RecipeCard = memo(({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.some(fav => fav.id === recipe.id));
  }, [recipe.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    const newIsFavorite = toggleFavorite(recipe);
    setIsFavorite(newIsFavorite);
  };

  if (!recipe) return null;

  return (
    <div className="recipe-card group">
      <div className="relative">
        <RecipeHeader 
          image={recipe.image} 
          title={recipe.title} 
          alt={`${recipe.title} recipe`}
        />
        <div className="absolute top-4 right-4 z-10">
          <FavoriteButton 
            isFavorite={isFavorite} 
            onClick={handleFavoriteClick}
          />
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <IngredientList 
          title="Available Ingredients" 
          ingredients={recipe.usedIngredients} 
        />
        <IngredientList 
          title="Missing Ingredients" 
          ingredients={recipe.missedIngredients} 
        />
        <RecipeFooter 
          missedIngredientCount={recipe.missedIngredientCount}
          sourceUrl={recipe.sourceUrl}
        />
        
      </div>
    </div>
  );
});

RecipeCard.displayName = 'RecipeCard';

export default RecipeCard;